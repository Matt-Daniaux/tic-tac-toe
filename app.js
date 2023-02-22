/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

const gameBoard = (() => {
	const _gameBoard = [null, '', '', '', '', '', '', '', '', '']
	const square = document.querySelectorAll('.square')
	const squareArray = [null, ...square]

	const player = (name, playerDisplayPosition, mark) => {
		const score = 0
		let namePlayer = name

		const getMark = () => mark
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
				/* empty */
			}
		}
		playerNameDisplayPosition()

		const changePlayerName = () => {
			const formChangePlayer = document.querySelector('.form-Change-Player')
			namePlayer = formChangePlayer.elements[0].value
			playerNameDisplayPosition()
		}

		return {
			getMark,
			getName,
			getScore,
			playerNameDisplayPosition,
			changePlayerName,
		}
	}

	const player1 = player('JoeP1', 1, 'X')
	const player2 = player('MarcelP2', 2, 'O')

	const displayGameboard = () => {
		// eslint-disable-next-line no-restricted-syntax
		for (const iSquare in _gameBoard) {
			if (iSquare > '0') {
				squareArray[iSquare].textContent = _gameBoard[iSquare]
			}
		}
	}
	displayGameboard()

	const displayChangeName = (() => {
		const playerNameBtn = document.querySelector('.change-name')
		const blurDiv = document.querySelector('.blur-background')
		const formChangePlayer = document.querySelector('.form-Change-Player')
		const sendPlayerNameChange = document.querySelector('.send')

		playerNameBtn.addEventListener('click', () => {
			blurDiv.classList.add('display-contents')
			formChangePlayer.classList.add('display-contents')
		})

		sendPlayerNameChange.addEventListener('click', () => {
			const selectedRadioBtn = document.querySelector(
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
	})()

	const displayScore = (() => {
		const scoreP1 = document.querySelector('.scoreP1')
		const scoreP2 = document.querySelector('.scoreP2')

		scoreP1.textContent = player1.getScore()
		scoreP2.textContent = player2.getScore()
	})()

	const displayMark = (() => {
		const markP1 = document.querySelector('.markP1')
		const markP2 = document.querySelector('.markP2')

		markP1.textContent = `Mark: ${player1.getMark()}`
		markP2.textContent = `Mark: ${player2.getMark()}`
	})()

	const markCount = () => {
		const marker = _gameBoard.reduce(
			(obj, item) => {
				if (!obj[item]) {
					obj[item] = 0
				}
				obj[item]++
				return obj
			},
			{ X: 0, O: 0 }
		)
		return { marker }
	}

	const playerTurn = () => {
		squareArray.forEach((e, i) => {
			if (i > 0 && _gameBoard[i] === '') {
				squareArray[i].addEventListener('click', () => {
					if (
						markCount().marker.X <= markCount().marker.O &&
						_gameBoard[i] === ''
					) {
						_gameBoard[i] = player1.getMark()
					} else if (
						markCount().marker.X > markCount().marker.O &&
						_gameBoard[i] === ''
					) {
						_gameBoard[i] = player2.getMark()
					}
					displayGameboard()
				})
			}
		})
	}

	const gameFlow = (() => {
		playerTurn()
	})()

	return {}
})()
