/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

const ticTacToe = (() => {
	let _gameBoard = [null, '', '', '', '', '', '', '', '', '']

	const squares = document.querySelectorAll('.square')
	const squareArray = [null, ...squares]

	const player1Box = document.querySelector('.player1')
	const player2Box = document.querySelector('.player2')
	const displayResultBox = document.querySelector('.display-result')

	const player = (name, playerDisplayPosition, mark) => {
		// eslint-disable-next-line prefer-const
		let score = 0
		let namePlayer = name
		// lastWinner = 1 if player win round
		const lastWinner = 0

		const getMark = () => mark
		const getName = () => namePlayer
		const playerNameDisplayPosition = () => {
			const p1Display = document.querySelector('.player1DisplayName')
			const p2Display = document.querySelector('.player2DisplayName')
			if (playerDisplayPosition === 1) {
				p1Display.textContent = namePlayer
			} else if (playerDisplayPosition === 2) {
				p2Display.textContent = namePlayer
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
			lastWinner,
			changePlayerName,
		}
	}
	const player1 = player('Bibo', 1, 'X')
	const player2 = player('Bourbou', 2, 'O')

	const display = (() => {
		const displayGameboard = () => {
			// eslint-disable-next-line no-restricted-syntax
			for (const square in _gameBoard) {
				if (square > '0') {
					squareArray[square].textContent = _gameBoard[square]
				}
			}
		}

		const displayScore = () => {
			const scoreP1 = document.querySelector('.scoreP1')
			const scoreP2 = document.querySelector('.scoreP2')

			scoreP1.textContent = player1.score
			scoreP2.textContent = player2.score
		}

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

		const displayMark = (() => {
			const markP1 = document.querySelector('.markP1')
			const markP2 = document.querySelector('.markP2')

			markP1.textContent = `Mark: ${player1.getMark()}`
			markP2.textContent = `Mark: ${player2.getMark()}`
		})()

		const displayResultMessage = (() => {
			const resultText = document.querySelector('.result-text')
			/* const restartBtn = document.querySelector('.restart-btn') */
			const winnerP1 = () => {
				resultText.textContent = `${player1.getName()} win`
				displayResultBox.classList.add('display-result-content')
			}
			const winnerP2 = () => {
				resultText.textContent = `${player2.getName()} win`
				displayResultBox.classList.add('display-result-content')
			}
			const deuce = () => {
				resultText.textContent = 'Deuce'
				displayResultBox.classList.add('display-result-content')
			}
			return { winnerP1, winnerP2, deuce }
		})()

		return {
			displayGameboard,
			displayScore,
			displayResultMessage,
		}
	})()

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

		const bigWinner = () => {
			if (winnerX === true) {
				if (player1.getMark() === 'X') {
					player1.score += 1
					display.displayScore()
					display.displayResultMessage.winnerP1()
					player2Box.classList.remove('player2-glow')
					player1Box.classList.add('player1-glow')
					// 2 - 2 value is use to stop board from being click
					player1.lastWinner = 2
					player2.lastWinner = 2
				} else {
					player2.score += 1
					display.displayScore()
					display.displayResultMessage.winnerP2()
					player1Box.classList.remove('player1-glow')
					player2Box.classList.add('player2-glow')
					player1.lastWinner = 2
					player2.lastWinner = 2
				}
			} else if (winnerO === true) {
				if (player1.getMark() === 'O') {
					player1.score += 1
					display.displayScore()
					display.displayResultMessage.winnerP1()
					player2Box.classList.remove('player2-glow')
					player1Box.classList.add('player1-glow')
					player1.lastWinner = 2
					player2.lastWinner = 2
				} else {
					player2.score += 1
					display.displayScore()
					display.displayResultMessage.winnerP2()
					player1Box.classList.remove('player1-glow')
					player2Box.classList.add('player2-glow')
					player1.lastWinner = 2
					player2.lastWinner = 2
				}
			} else if (
				deuce.X + deuce.O === 9 &&
				winnerO !== true &&
				winnerX !== true
			) {
				display.displayResultMessage.deuce()
			}
		}

		const lastWinner = () => {
			if (winnerX === true) {
				player1.lastWinner = 1
				player2.lastWinner = 0
			} else if (winnerO === true) {
				player2.lastWinner = 1
				player1.lastWinner = 0
			}
		}

		return { winnerX, winnerO, deuce, bigWinner, lastWinner }
	}

	const turnPlayerGlow = (() => {
		const initialGlow = (() => {
			player1Box.classList.add('player1-glow')
			player2Box.classList.remove('player2-glow')
		})()

		const glowFct = (X, O) => {
			if (
				(player1.lastWinner === 0 && player2.lastWinner === 1) ||
				(player1.lastWinner === 0 && player2.lastWinner === 0)
			) {
				if (X > O) {
					player1Box.classList.add('player1-glow')
					player2Box.classList.remove('player2-glow')
				} else if (X === O) {
					player2Box.classList.add('player2-glow')
					player1Box.classList.remove('player1-glow')
				}
			} else if (player1.lastWinner === 1 && player2.lastWinner === 0) {
				if (O > X) {
					player2Box.classList.add('player2-glow')
					player1Box.classList.remove('player1-glow')
				} else if (X === O) {
					player1Box.classList.add('player1-glow')
					player2Box.classList.remove('player2-glow')
				}
			}
		}

		const glowFctOnRestart = () => {
			if (
				(player1.lastWinner === 0 && player2.lastWinner === 1) ||
				(player1.lastWinner === 0 && player2.lastWinner === 0)
			) {
				player1Box.classList.add('player1-glow')
				player2Box.classList.remove('player2-glow')
			} else if (player1.lastWinner === 1 && player2.lastWinner === 0) {
				player2Box.classList.add('player2-glow')
				player1Box.classList.remove('player1-glow')
			}
		}

		const glowWinner = (xWin, oWin, deuce) => {
			if (xWin === true) {
				if (player1.getMark() === 'X') {
					player2Box.classList.remove('player2-glow')
					player1Box.classList.add('player1-glow')
				} else {
					player1Box.classList.remove('player1-glow')
					player2Box.classList.add('player2-glow')
				}
			} else if (oWin === true) {
				if (player1.getMark() === 'O') {
					player2Box.classList.remove('player2-glow')
					player1Box.classList.add('player1-glow')
				} else {
					player1Box.classList.remove('player1-glow')
					player2Box.classList.add('player2-glow')
				}
			} else if (deuce.X + deuce.O === 9 && xWin !== true && oWin !== true) {
				player1Box.classList.remove('player1-glow')
				player2Box.classList.remove('player2-glow')
			}
		}

		return { glowFct, glowFctOnRestart, glowWinner }
	})()

	const turnAndWinner = (() => {
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

		const turn = () => {
			const controller = new AbortController()
			squareArray.forEach((e, i) => {
				if (i > 0 && squareArray[i].textContent === '') {
					squareArray[i].addEventListener('click', () => {
						const markerCount = markCount()
						if (
							(player1.lastWinner === 0 && player2.lastWinner === 0) ||
							(player1.lastWinner === 0 && player2.lastWinner === 1)
						) {
							if (
								markerCount.marker.X <= markerCount.marker.O &&
								squareArray[i].textContent === ''
							) {
								_gameBoard[i] = player1.getMark()
								squareArray[i].classList.add('squareP1')
								squareArray[i].classList.remove('squareP2')
								turnPlayerGlow.glowFct(
									markerCount.marker.X,
									markerCount.marker.O
								)
							} else if (
								markerCount.marker.X > markerCount.marker.O &&
								squareArray[i].textContent === ''
							) {
								_gameBoard[i] = player2.getMark()
								squareArray[i].classList.add('squareP2')
								squareArray[i].classList.remove('squareP1')
								turnPlayerGlow.glowFct(
									markerCount.marker.X,
									markerCount.marker.O
								)
							}
						} else if (player1.lastWinner === 1 && player2.lastWinner === 0) {
							if (
								markerCount.marker.X >= markerCount.marker.O &&
								squareArray[i].textContent === ''
							) {
								_gameBoard[i] = player2.getMark()
								squareArray[i].classList.add('squareP2')
								squareArray[i].classList.remove('squareP1')
								turnPlayerGlow.glowFct(
									markerCount.marker.X,
									markerCount.marker.O
								)
							} else if (
								markerCount.marker.X < markerCount.marker.O &&
								squareArray[i].textContent === ''
							) {
								_gameBoard[i] = player1.getMark()
								squareArray[i].classList.add('squareP1')
								squareArray[i].classList.remove('squareP2')
								turnPlayerGlow.glowFct(
									markerCount.marker.X,
									markerCount.marker.O
								)
							}
						}
						// Need to receive value of winnerX/O/Deuce after every click
						const allowWinner = winner()
						allowWinner.bigWinner()
						turnPlayerGlow.glowWinner(
							allowWinner.winnerX,
							allowWinner.winnerO,
							allowWinner.deuce
						)
						display.displayGameboard()
					})
				}
			})
		}

		const newRound = (() => {
			const restartBtn = document.querySelector('.restart-btn')

			const restartFct = () => {
				// Need so that value of lastWinner of each player is put back to playable value
				const { lastWinner } = winner()
				lastWinner()
				_gameBoard = [null, '', '', '', '', '', '', '', '', '']
				display.displayGameboard()
				displayResultBox.classList.remove('display-result-content')
				squareArray.forEach((e, i) => {
					if (i > 0) {
						squareArray[i].classList.remove('squareP1')
						squareArray[i].classList.remove('squareP2')
					}
				})
			}

			const restartGame = (() => {
				restartBtn.addEventListener('click', () => {
					restartFct()
					turnPlayerGlow.glowFctOnRestart()
				})
			})()

			return { restartFct }
		})()

		const reinitialize = (() => {
			const reinitializeBtn = document.querySelector('.reinitialize')

			const scoreZero = () => {
				player1.score = 0
				player2.score = 0
				display.displayScore()
			}

			const lastWinnerToZero = () => {
				player1.lastWinner = 0
				player2.lastWinner = 0
			}

			const scoreAndBoardZero = () => {
				scoreZero()
				newRound.restartFct()
				lastWinnerToZero()
				turnPlayerGlow.glowFctOnRestart()
			}

			const restartGameAndBoard = (() => {
				reinitializeBtn.addEventListener('click', scoreAndBoardZero)
			})()
		})()

		return { turn, newRound, reinitialize }
	})()

	const game = (() => {
		display.displayGameboard()
		display.displayScore()
		turnAndWinner.turn()
	})()
})()

