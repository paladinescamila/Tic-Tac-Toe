import {create} from 'zustand';
import {switchMark} from '../utils/switchMark';
import {INITIAL_BOARD, INITIAL_GAME} from '../constants/initialStates';
import {getInitialGameOnStart, getGameOnRestart} from '../constants/initialStates';
import {checkBoard} from '../utils/checkBoard';
import {playCpuTurn} from '../utils/playCpuTurn';
import {playUserTurn} from '../utils/playUserTurn';

interface GameStore {
	game: Game;
	startGameWithCPU: (player1Mark: Mark) => void;
	startGameWithPlayer: (player1Mark: Mark) => void;
	restart: () => void;
	markCell: (index: number) => void;
	quit: () => void;
	nextRound: () => void;
	getFinishGameState: (result: GameResult, board: GameBoard) => Game;
	scheduleCpuTurn: (seconds?: number) => void;
}

const useGameStore = create<GameStore>((set, get) => ({
	game: INITIAL_GAME,

	startGameWithCPU: (player1Mark) => {
		set({game: getInitialGameOnStart(player1Mark, 'cpu')});

		if (player1Mark === 'O') get().scheduleCpuTurn(0.5);
	},

	startGameWithPlayer: (player1Mark) =>
		set({game: getInitialGameOnStart(player1Mark, 'multiplayer')}),

	restart: () => set((state) => ({game: {...state.game, turn: 'X', board: INITIAL_BOARD}})),

	markCell: (index) =>
		set((state) => {
			const {game} = state;

			if (game.board[index] !== null || game.state !== 'playing') return state;

			const board = playUserTurn(game.board, game.turn, index);
			const result = checkBoard(board);

			if (result.mark) return {game: get().getFinishGameState(result, board)};
			else {
				if (game.turn === game.player1.mark && game.mode === 'cpu') get().scheduleCpuTurn();

				return {game: {...game, turn: switchMark(game.turn), board}};
			}
		}),

	quit: () => set({game: INITIAL_GAME}),

	nextRound: () => set((state) => ({game: getGameOnRestart(state.game)})),

	getFinishGameState: (result, board) => {
		const {game} = get();

		return {
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
		};
	},

	scheduleCpuTurn: (seconds = 1) => {
		setTimeout(() => set((state) => ({game: {...state.game, cpuIsPlaying: true}})), 10);

		setTimeout(
			() =>
				set((state) => {
					const {game} = state;

					const board = playCpuTurn(game.board, game.player2.mark);
					const result = checkBoard(board);

					if (result.mark) {
						return {game: get().getFinishGameState(result, board)};
					}

					return {game: {...game, turn: switchMark(game.turn), board, cpuIsPlaying: false}};
				}),
			seconds * 1000,
		);
	},
}));

export default useGameStore;
