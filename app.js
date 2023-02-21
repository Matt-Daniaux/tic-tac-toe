const player = (name, playerDisplayPosition) => {
	let score = 0

	let namePlayer = name

	const getName = () => namePlayer
	const getScore = () => score

	const playerNameDisplayPosition = () => {
		const p1Display = document.querySelector('.player1DisplayName')
		const p2Display = document.querySelector('.player2DisplayName')

		if (playerDisplayPosition === 1) {
			p1Display.textContent = namePlayer
		} else if (playerDisplayPosition === 2) {
			p2Display.textContent = namePlayer
		} else {
		}
	}

	playerNameDisplayPosition()

	const formChangePlayer = document.querySelector('.form-Change-Player')
	const changePlayerName = () => {
		namePlayer = formChangePlayer.elements[0].value
		playerNameDisplayPosition()
	}

	return { getName, getScore, score, changePlayerName }
}

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

	// Create Player 1 and 2
	const player1 = player('Player1', 1)
	const player2 = player('Player2', 2)

	// Display player name
	const playerNameBtn = document.querySelector('.change-name')
	const blurDiv = document.querySelector('.blur-background')
	const formChangePlayer = document.querySelector('.form-Change-Player')

	playerNameBtn.addEventListener('click', () => {
		blurDiv.classList.add('display-contents')
		formChangePlayer.classList.add('display-contents')
	})

	const sendPlayerNameChange = document.querySelector('.send')
	sendPlayerNameChange.addEventListener('click', () => {
		let selectedRadioBtn = document.querySelector(
			'input[type="radio"][name = "player"]:checked'
		)
		if (selectedRadioBtn.value === '1') {
			gameBoard.player1.changePlayerName()
		} else if (selectedRadioBtn.value === '2') {
			gameBoard.player2.changePlayerName()
		}

		blurDiv.classList.remove('display-contents')
		formChangePlayer.classList.remove('display-contents')
	})

	displayGameboard()

	const gameFlow = () => {}

	return { squareArray, player1, player2 }
})()

/* const displayNamePlayer1 = (() => {
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
})() */

/* const displayNamePlayer2 = () => {
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
	} */
