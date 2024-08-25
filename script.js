const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const endGameDisplay = document.getElementById('endGame');
const resultMessageDisplay = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    let win = false;
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (cells[a].classList.contains(currentPlayer.toLowerCase()) &&
            cells[b].classList.contains(currentPlayer.toLowerCase()) &&
            cells[c].classList.contains(currentPlayer.toLowerCase())) {
            win = true;
            combination.forEach(index => {
                cells[index].classList.add('winning');
            });
        }
    });
    return win;
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function handleCellClick(e) {
    const cell = e.target;
    if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        endGameDisplay.style.display = 'flex';
        resultMessageDisplay.textContent = `${currentPlayer} Wins!`;
    } else if (checkDraw()) {
        gameActive = false;
        endGameDisplay.style.display = 'flex';
        resultMessageDisplay.textContent = `It's a Draw!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s Turn`;
    }
}

function restartGame() {
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winning');
        cell.textContent = '';
    });

    // Set the winner as the next player to start
    statusDisplay.textContent = `${currentPlayer}'s Turn`;
    endGameDisplay.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newGameButton.addEventListener('click', restartGame);

statusDisplay.textContent = `${currentPlayer}'s Turn`;