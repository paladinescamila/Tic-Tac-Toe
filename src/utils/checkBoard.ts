/**
 * Checks the current state of the game board and determines if there is a winner, a draw, or if the game is still ongoing.
 * @param board The current state of the game board.
 * @returns The result of the game: 'X' if player X wins, 'O' if player O wins, 'tie' if the game is a tie, or null if the game is still ongoing.
 */
export const checkBoard = (board: Game['board']): Game['result'] => {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	// Check for a winner
	for (const combination of winningCombinations) {
		const [a, b, c] = combination;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return {mark: board[a], cells: combination as Combination};
		}
	}

	// Check for a tie
	if (board.every((cell) => cell !== null)) {
		return {mark: 'tie', cells: [0, 0, 0]};
	}

	// If the game is still ongoing
	return {mark: null, cells: [0, 0, 0]};
};
