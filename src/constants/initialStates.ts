import {switchMark} from '../utils/switchMark';

export const INITIAL_RESULT: GameResult = {mark: null, cells: [0, 0, 0]};

export const INITIAL_BOARD: GameBoard = Array(9).fill(null) as GameBoard;

export const INITIAL_GAME: Game = {
	mode: 'cpu',
	state: 'initial',
	result: INITIAL_RESULT,
	turn: 'X',
	player1: {mark: 'X', score: 0},
	player2: {mark: 'O', score: 0},
	ties: 0,
	board: INITIAL_BOARD,
	cpuIsPlaying: false,
};

export const getGameOnStart = (player1Mark: Mark, mode: GameMode): Game => ({
	mode,
	state: 'playing',
	result: INITIAL_RESULT,
	turn: 'X',
	player1: {mark: player1Mark, score: 0},
	player2: {mark: switchMark(player1Mark), score: 0},
	ties: 0,
	board: INITIAL_BOARD,
	cpuIsPlaying: false,
});

export const getGameOnRestart = (game: Game): Game => ({
	...game,
	state: 'playing',
	result: INITIAL_RESULT,
	turn: 'X',
	board: INITIAL_BOARD,
	cpuIsPlaying: false,
});

export const getGameOnFinish = (game: Game, board: GameBoard, result: GameResult): Game => ({
	...game,
	state: 'finished',
	result,
	turn: 'X',
	player1: {
		...game.player1,
		score: result.mark === game.player1.mark ? game.player1.score + 1 : game.player1.score,
	},
	player2: {
		...game.player2,
		score: result.mark === game.player2.mark ? game.player2.score + 1 : game.player2.score,
	},
	ties: result.mark === 'tie' ? game.ties + 1 : game.ties,
	board,
});
