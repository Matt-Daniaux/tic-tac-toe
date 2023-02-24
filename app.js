/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

const gameBoard = (() => {
	let _gameBoard = [null, '', '', '', '', '', '', '', '', '']
	const square = document.querySelectorAll('.square')
	const squareArray = [null, ...square]

	const player = (name, playerDisplayPosition, mark) => {
		// eslint-disable-next-line prefer-const
		let score = 0
		let namePlayer = name

		const getMark = () => mark
		const getName = () => namePlayer
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
			score,
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

	const displayScore = () => {
		const scoreP1 = document.querySelector('.scoreP1')
		const scoreP2 = document.querySelector('.scoreP2')

		scoreP1.textContent = player1.score
		scoreP2.textContent = player2.score
	}
	displayScore()

	const displayMark = (() => {
		const markP1 = document.querySelector('.markP1')
		const markP2 = document.querySelector('.markP2')

		markP1.textContent = `Mark: ${player1.getMark()}`
		markP2.textContent = `Mark: ${player2.getMark()}`
	})()

	const displayResultBox = document.querySelector('.display-result')
	const displayResultMessage = () => {
		const resultText = document.querySelector('.result-text')
		/* const restartBtn = document.querySelector('.restart-btn') */
		const winnerP1 = () => {
			resultText.textContent = 'P1 win '
			displayResultBox.classList.add('display-result-content')
		}
		const winnerP2 = () => {
			resultText.textContent = 'P2 win '
			displayResultBox.classList.add('display-result-content')
		}
		const deuce = () => {
			resultText.textContent = 'Deuce'
			displayResultBox.classList.add('display-result-content')
		}
		return { winnerP1, winnerP2, deuce }
	}

	const newRound = () => {
		const restartBtn = document.querySelector('.restart-btn')
		const newTurn = turnAndWinner()

		const restartFct = () => {
			_gameBoard = [null, '', '', '', '', '', '', '', '', '']
			displayGameboard()
			displayResultBox.classList.remove('display-result-content')
			newTurn.turn()
		}

		const restartGame = () => {
			restartBtn.addEventListener('click', restartFct)
		}
		return { restartFct, restartGame }
	}

	const reinitialize = () => {
		const reinitializeBtn = document.querySelector('.reinitialize')
		const restartGame = newRound()

		const scoreZero = () => {
			player1.score = 0
			player2.score = 0
			displayScore()
		}

		const scoreAndBoardZero = () => {
			scoreZero()
			restartGame.restartFct()
		}

		const restartGameAndBoard = () => {
			reinitializeBtn.addEventListener('click', scoreAndBoardZero)
		}

		return { restartGameAndBoard }
	}

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

	const winner = () => {
		const winnerX =
			[1, 2, 3].every((x) => _gameBoard[x] === 'X') ||
			[4, 5, 6].every((x) => _gameBoard[x] === 'X') ||
			[7, 8, 9].every((x) => _gameBoard[x] === 'X') ||
			[1, 4, 7].every((x) => _gameBoard[x] === 'X') ||
			[2, 5, 8].every((x) => _gameBoard[x] === 'X') ||
			[3, 6, 9].every((x) => _gameBoard[x] === 'X') ||
			[1, 5, 9].every((x) => _gameBoard[x] === 'X') ||
			[3, 5, 7].every((x) => _gameBoard[x] === 'X')

		const winnerO =
			[1, 2, 3].every((x) => _gameBoard[x] === 'O') ||
			[4, 5, 6].every((x) => _gameBoard[x] === 'O') ||
			[7, 8, 9].every((x) => _gameBoard[x] === 'O') ||
			[1, 4, 7].every((x) => _gameBoard[x] === 'O') ||
			[2, 5, 8].every((x) => _gameBoard[x] === 'O') ||
			[3, 6, 9].every((x) => _gameBoard[x] === 'O') ||
			[1, 5, 9].every((x) => _gameBoard[x] === 'O') ||
			[3, 5, 7].every((x) => _gameBoard[x] === 'O')

		const deuce = _gameBoard.reduce((marks, mark) => {
			if (!marks[mark]) {
				marks[mark] = 0
			}
			marks[mark] += 1
			return marks
		}, {})

		const message = displayResultMessage()

		if (winnerX === true) {
			if (player1.getMark() === 'X') {
				player1.score += 1
				displayScore()
				message.winnerP1()
			} else {
				player2.score += 1
				displayScore()
				message.winnerP2()
			}
		} else if (winnerO === true) {
			if (player1.getMark() === 'O') {
				player1.score += 1
				displayScore()
				message.winnerP1()
			} else {
				player2.score += 1
				displayScore()
				message.winnerP2()
			}
		} else if (
			deuce.X + deuce.O === 9 &&
			(winnerO !== true || winnerX !== true)
		) {
			message.deuce()
		}
		return { winnerX, winnerO, deuce }
	}

	const turnPlayerGlow = () => {
		const player1Box = document.querySelector('.player1')
		const player2Box = document.querySelector('.player2')

		const initialGlow = () => {
			player1Box.classList.add('player1-turn')
		}

		const glowFct = (X, O) => {
			if (X > O) {
				player1Box.classList.remove('player1-turn')
				player2Box.classList.add('player2-turn')
			} else if (X === O) {
				player2Box.classList.remove('player2-turn')
				player1Box.classList.add('player1-turn')
			}
		}
		return { glowFct, initialGlow }
	}

	const turnAndWinner = () => {
		const turn = () => {
			const controller = new AbortController()
			squareArray.forEach((e, i) => {
				if (i > 0) {
					squareArray[i].addEventListener(
						'click',
						() => {
							if (markCount().marker.X <= markCount().marker.O) {
								_gameBoard[i] = player1.getMark()
							} else if (markCount().marker.X > markCount().marker.O) {
								_gameBoard[i] = player2.getMark()
							}
							const allowWinner = winner()
							if (
								allowWinner.winnerX === true ||
								allowWinner.winnerO === true
							) {
								controller.abort()
							}
							displayGameboard()
						},
						{
							once: true,
							signal: controller.signal,
						}
					)
					const glow = turnPlayerGlow()
					squareArray[i].addEventListener('click', () => {
						const mark = markCount()
						glow.glowFct(mark.marker.X, mark.marker.O)
					})
				}
			})
		}
		return { turn }
	}

	const game = (() => {
		const playGame = turnAndWinner()
		const restartGame = newRound()
		const restartEverything = reinitialize()
		const glow = turnPlayerGlow()

		glow.initialGlow()
		playGame.turn()
		restartGame.restartGame()
		restartEverything.restartGameAndBoard()
	})()

	return { _gameBoard, player1, player2, winner }
})()
