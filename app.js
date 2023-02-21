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
	const changePlayerName = () => {
		const formChangePlayer = document.querySelector('.form-Change-Player')
		namePlayer = formChangePlayer.elements[0].value
		console.log(namePlayer)
		playerNameDisplayPosition()
	}

	playerNameDisplayPosition()

	return { getName, getScore, changePlayerName }
}

const gameBoard = (() => {
	const gameBoard = [null, 'X', '', '', '', '', 'O', '', '', '']
	const square = document.querySelectorAll('.square')
	const squareArray = [null, ...square]

	const displayGameboard = (square) => {
		for (square in gameBoard) {
			if (square === '0') {
				continue
			} else {
				squareArray[square].textContent = gameBoard[square]
			}
		}
	}

	const gameFlow = () => {}

	// Create Player 1 and 2
	const player1 = player('Player1', 1)
	const player2 = player('Player2', 2)

	// Display player name
	const playerNameBtn = document.querySelector('.change-name')
	const blurDiv = document.querySelector('.blur-background')
	const formChangePlayer = document.querySelector('.form-Change-Player')
	const sendPlayerNameChange = document.querySelector('.send')

	playerNameBtn.addEventListener('click', () => {
		blurDiv.classList.add('display-contents')
		formChangePlayer.classList.add('display-contents')
	})

	sendPlayerNameChange.addEventListener('click', () => {
		let selectedRadioBtn = document.querySelector(
			'input[type="radio"][name="player"]:checked'
		)
		if (selectedRadioBtn.value === '1') {
			player1.changePlayerName()
		} else if (selectedRadioBtn.value === '2') {
			player2.changePlayerName()
		}

		blurDiv.classList.remove('display-contents')
		formChangePlayer.classList.remove('display-contents')
	})

	displayGameboard()

	return { player1, player2 }
})()
