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

export const getInitialGameOnStart = (player1Mark: Mark, mode: GameMode): Game => ({
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
