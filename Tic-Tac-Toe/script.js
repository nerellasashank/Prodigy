document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartBtn = document.getElementById('restartBtn');
    const messageModal = document.getElementById('messageModal');
    const closeButton = document.querySelector('.close-button');
    const messageText = document.getElementById('messageText');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== null || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            showMessage(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameState.every(cell => cell !== null)) {
            showMessage('Game is a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function restartGame() {
        currentPlayer = 'X';
        gameState = Array(9).fill(null);
        gameActive = true;
        cells.forEach(cell => cell.textContent = '');
    }

    function showMessage(message) {
        messageText.textContent = message;
        messageModal.style.display = 'flex';
    }

    function closeModal() {
        messageModal.style.display = 'none';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == messageModal) {
            closeModal();
        }
    });
});
