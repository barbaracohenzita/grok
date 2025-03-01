const grid = document.querySelector('.grid');
let board = Array(16).fill(0);

function initGame() {
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        grid.appendChild(tile);
    }
    addTile(); addTile();
    updateBoard();
    document.addEventListener('keydown', handleInput);
}

function addTile() {
    let empty = board.map((v, i) => v === 0 ? i : -1).filter(i => i !== -1);
    if (empty.length) {
        let pos = empty[Math.floor(Math.random() * empty.length)];
        board[pos] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    const tiles = grid.children;
    for (let i = 0; i < 16; i++) {
        tiles[i].textContent = board[i] || '';
        tiles[i].className = 'tile'; // Reset classes
        if (board[i] === 16) tiles[i].classList.add('morph-seed');
        if (board[i] === 64) tiles[i].classList.add('morph-wave');
    }
}

function slide(direction) {
    let moved = false;
    let newBoard = [...board];

    // Convert 1D board to 2D for easier sliding
    let matrix = [];
    for (let i = 0; i < 4; i++) matrix.push(newBoard.slice(i * 4, i * 4 + 4));

    if (direction === 'left' || direction === 'right') {
        for (let r = 0; r < 4; r++) {
            let row = matrix[r].filter(v => v); // Remove zeros
            if (direction === 'right') row.reverse();
            for (let i = 0; i < row.length - 1; i++) {
                if (row[i] === row[i + 1]) {
                    row[i] *= 2;
                    row.splice(i + 1, 1);
                    moved = true;
                }
            }
            while (row.length < 4) row.push(0);
            if (direction === 'right') row.reverse();
            matrix[r] = row;
        }
    } else { // up or down
        for (let c = 0; c < 4; c++) {
            let col = [matrix[0][c], matrix[1][c], matrix[2][c], matrix[3][c]].filter(v => v);
            if (direction === 'down') col.reverse();
            for (let i = 0; i < col.length - 1; i++) {
                if (col[i] === col[i + 1]) {
                    col[i] *= 2;
                    col.splice(i + 1, 1);
                    moved = true;
                }
            }
            while (col.length < 4) col.push(0);
            if (direction === 'down') col.reverse();
            for (let r = 0; r < 4; r++) matrix[r][c] = col[r];
        }
    }

    // Flatten back to 1D
    board = matrix.flat();
    if (moved) addTile();
    updateBoard();
}

function handleInput(e) {
    switch (e.key) {
        case 'ArrowUp': slide('up'); break;
        case 'ArrowDown': slide('down'); break;
        case 'ArrowLeft': slide('left'); break;
        case 'ArrowRight': slide('right'); break;
    }
}

initGame();
