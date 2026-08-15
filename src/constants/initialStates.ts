export const INITIAL_RESULT: Game['result'] = {mark: null, cells: [0, 0, 0]};

export const INITIAL_BOARD: Game['board'] = Array(9).fill(null) as Game['board'];

export const INITIAL_GAME: Game = {
	mode: 'cpu',
	state: 'initial',
	result: INITIAL_RESULT,
	turn: 'X',
	player1: {mark: 'X', score: 0},
	player2: {mark: 'O', score: 0},
	ties: 0,
	board: INITIAL_BOARD,
};
