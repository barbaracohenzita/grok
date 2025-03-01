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
    if (board[i] >= 16) tiles[i].classList.add('morph'); // Morph effect
  }
}

function handleInput(e) {
  // Add slide logic here (up, down, left, right)
  updateBoard();
}

initGame();
