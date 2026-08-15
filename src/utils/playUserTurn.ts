/**
 * Plays the user's turn by updating the game board with the user's mark at the specified index.
 * @param board The current state of the game board, represented as an array of marks ('X', 'O', or null).
 * @param mark The mark to be placed by the user ('X' or 'O').
 * @param index The index of the cell where the user's mark should be placed (0-8).
 * @returns A new board state with the user's mark placed at the specified index.
 */
export const playUserTurn = (board: GameBoard, mark: Mark, index: number): GameBoard => {
	const newBoard: GameBoard = [...board];

	newBoard[index] = mark;

	return newBoard;
};
