/**
 * Returns the marks for each player based on the game mode.
 * @param game The current game.
 * @returns The marks for each player.
 */
export const getMarks = (game: Game) => {
	const {mode, player1, player2} = game;

	if (mode === 'cpu') {
		return {
			xPlayer: {
				name: player1.mark === 'X' ? 'you' : 'cpu',
				score: player1.mark === 'X' ? player1.score : player2.score,
			},
			oPlayer: {
				name: player1.mark === 'O' ? 'you' : 'cpu',
				score: player1.mark === 'O' ? player1.score : player2.score,
			},
		};
	} else {
		return {
			xPlayer: {
				name: player1.mark === 'X' ? 'p1' : 'p2',
				score: player1.mark === 'X' ? player1.score : player2.score,
			},
			oPlayer: {
				name: player1.mark === 'O' ? 'p1' : 'p2',
				score: player1.mark === 'O' ? player1.score : player2.score,
			},
		};
	}
};
