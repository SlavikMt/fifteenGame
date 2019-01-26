import './index.css';

const renderRow = (arr) =>
    `<div class='square'>${arr.join('</div><div class=\'square\'>')}</div>`

const renderRows = (arr) => {
    return arr.reduce((acc, current) => {
        return acc + renderRow(current);
    }, '');
};

const shuffleState = (state) => {
    const suffleArr = (inputArr) => {
        const arr = [...inputArr];
        for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
    const flattenArr = state.reduce((acc, val) => {
        return [...acc, ...val]
    }, []);
    const shuffledArr = suffleArr(flattenArr);
    return [
        shuffledArr.slice(0, 4),
        shuffledArr.slice(4, 8),
        shuffledArr.slice(8, 12),
        shuffledArr.slice(12, 16),
    ]
}

const renderGame = (shuffledArray, domNode = document.getElementById('app')) => {
    const rows = renderRows(shuffledArray).replace(
        '<div class=\'square\'></div>',
        '<div class=\'square empty\'></div>'
    );
    domNode.innerHTML = rows;
};







const fifteen = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, null]
];


const state = shuffleState(fifteen);
renderGame(fifteen);

if (renderGame(fifteen) === fifteen) { alert('you won') }

const getXY = (source) => {
    const y = source.findIndex(arr => arr.includes(null));
    const x = source[y].findIndex(x => x === null);
    console.log({ y, x });
    return { y, x };

};
//const xy = getXY(state);


document.addEventListener('keydown', e => {
    const xyOfEmptyCell = getXY(state);
    if (e.keyCode === 38) {
        // up arrow
        if (xyOfEmptyCell.y === 3) return; // figure out why we have this checking
        const nextY = xyOfEmptyCell.y + 1;
        const nextX = xyOfEmptyCell.x;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
    }
    if (e.keyCode === 40) {
        // down arrow
        if (xyOfEmptyCell.y === 0) return; // figure out why we have this checking
        const nextY = xyOfEmptyCell.y - 1;
        const nextX = xyOfEmptyCell.x;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
    }
    if (e.keyCode === 37) {
        // left arrow
        if (xyOfEmptyCell.x === 3) return; // figure out why we have this checking
        const nextY = xyOfEmptyCell.y;
        const nextX = xyOfEmptyCell.x + 1;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
    }

    if (e.keyCode === 39) {
        // right arrow
        if (xyOfEmptyCell.x === 0) return; // figure out why we have this checking
        const nextY = xyOfEmptyCell.y;
        const nextX = xyOfEmptyCell.x - 1;
        state[xyOfEmptyCell.y][xyOfEmptyCell.x] = state[nextY][nextX];
        state[nextY][nextX] = null;
        renderGame(state);
    }

});