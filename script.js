const upperCell = document.querySelectorAll('.upper-cell')
const middleCell = document.querySelectorAll('.middle-cell')
const lowerCell = document.querySelectorAll('.lower-cell')
const resetBtn = document.querySelector('.reset-btn')

let board = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
]
let currentPlayer = 'X'
let gameOver = false

function checkGameStatus() {
	const winnerRow = checBoard(board)
	const winnerDiag = checDiagonal(board)
	const winner = winnerRow || winnerDiag

	if (winner) {
		alert(`Победитель: ${winner}`)
		gameOver = true
		return true
	}

	let isDraw = board.every(row => row.every(cell => cell !== ''))
	if (isDraw) {
		alert('Ничья!')
		gameOver = true
		return true
	}

	return false
}

function handleClick(row, col, element) {
	if (gameOver || board[row][col] !== '') return

	board[row][col] = currentPlayer
	element.textContent = currentPlayer

	if (!checkGameStatus()) {
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
	}
}

upperCell.forEach((item, index) => {
	item.addEventListener('click', () => {
		handleClick(0, index, item)
	})
})
middleCell.forEach((item, index) => {
	item.addEventListener('click', () => {
		handleClick(1, index, item)
	})
})
lowerCell.forEach((item, index) => {
	item.addEventListener('click', () => {
		handleClick(2, index, item)
	})
})

function checBoard(board) {
	let winner = null
	board.forEach(row => {
		if (row[0] !== '' && row.every(cell => cell === row[0])) {
			winner = row[0]
		}
	})
	for (let i = 0; i < 3; i++) {
		let colArr = [board[0][i], board[1][i], board[2][i]]
		if (colArr[0] !== '' && colArr.every(item => item === colArr[0])) {
			winner = colArr[0]
		}
	}
	return winner
}

function checDiagonal(board) {
	let winner = null
	if (
		board[0][0] !== '' &&
		board[0][0] === board[1][1] &&
		board[0][0] === board[2][2]
	) {
		winner = board[0][0]
	}
	if (
		board[0][2] !== '' &&
		board[0][2] === board[1][1] &&
		board[0][2] === board[2][0]
	) {
		winner = board[0][2]
	}
	return winner
}

function resetGame() {
	board = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	]
	currentPlayer = 'X'
	gameOver = false

	upperCell.forEach(cell => (cell.textContent = ''))
	middleCell.forEach(cell => (cell.textContent = ''))
	lowerCell.forEach(cell => (cell.textContent = ''))
}

resetBtn.addEventListener('click', resetGame)
