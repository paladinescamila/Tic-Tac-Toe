/**
 * Plays a turn for the CPU by selecting a random empty cell on the board and placing the given mark in that cell.
 * @param board The current state of the game board, represented as an array of marks ('X', 'O', or null).
 * @param mark The mark to be placed by the CPU ('X' or 'O').
 * @returns A new board state with the CPU's mark placed in a randomly selected empty cell.
 */
export const playCpuTurn = (board: GameBoard, mark: Mark): GameBoard => {
	const emptyCells = board
		.map((cell, index) => (cell === null ? index : null))
		.filter((index) => index !== null) as number[];

	const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

	const newBoard: GameBoard = [...board];
	newBoard[randomIndex] = mark;

	return newBoard;
};
