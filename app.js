const player = (name) => {
	let score = 0

	const getName = () => name
	const getScore = () => score

	return { getName, getScore, score }
}

const displayNamePlayer1 = (() => {
	const playerNameBtn = document.querySelector('.player1Name')
	const formPlayer1 = document.querySelector('.formPlayer1')
	const player1DisplayName = document.querySelector('.player1DisplayName')

	let player1 = player('Player1')
	player1DisplayName.textContent = player1.getName()

	const changePlayerName = () => {
		player1.getName = () => formPlayer1.elements[0].value
		player1DisplayName.textContent = player1.getName()
	}

	playerNameBtn.addEventListener('click', changePlayerName)

	return { player1 }
})()

const gameBoard = (() => {
	const _gameBoard = [null, 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x']
	const square = document.querySelectorAll('.square')
	const squareArray = [null, ...square]

	const displayGameboard = (square) => {
		for (square in _gameBoard) {
			if (square === '0') {
				continue
			} else {
				squareArray[square].textContent = _gameBoard[square]
			}
		}
	}

	// Display player name

	const displayNamePlayer2 = () => {
		const playerNameBtn = document.querySelector('.player2Name')
		const formPlayer2 = document.querySelector('.formPlayer2')
		const player2DisplayName = document.querySelector('.player2DisplayName')

		let player2 = player('Player2')
		player2DisplayName.textContent = player2.getName()

		const changePlayerName = () => {
			player2.getName = () => formPlayer2.elements[0].value
			player2DisplayName.textContent = player2.getName()
		}

		playerNameBtn.addEventListener('click', changePlayerName)

		return { player2 }
	}

	displayGameboard()
	displayNamePlayer2()

	const gameFlow = () => {}

	return { squareArray }
})()
