import {create} from 'zustand';
import {switchMark} from '../utils/switchMark';
import {INITIAL_BOARD, INITIAL_GAME} from '../constants/initialStates';
import {getGameOnStart, getGameOnRestart, getGameOnFinish} from '../constants/initialStates';
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
	makeCpuTurn: (moment?: 'now' | 'delayed') => void;
}

const useGameStore = create<GameStore>((set, get) => ({
	game: INITIAL_GAME,

	startGameWithCPU: (player1Mark) => {
		set({game: getGameOnStart(player1Mark, 'cpu')});

		if (player1Mark === 'O') get().makeCpuTurn('now');
	},

	startGameWithPlayer: (player1Mark) => set({game: getGameOnStart(player1Mark, 'multiplayer')}),

	restart: () => {
		set((state) => ({game: {...state.game, turn: 'X', board: INITIAL_BOARD}}));

		const {game, makeCpuTurn} = get();

		if (game.mode === 'cpu' && game.player1.mark === 'O') makeCpuTurn('now');
	},

	markCell: (index) =>
		set((state) => {
			const {game, makeCpuTurn} = state;

			if (game.board[index] !== null || game.state !== 'playing') return state;

			const board = playUserTurn(game.board, game.turn, index);
			const result = checkBoard(board);

			if (result.mark) return {game: getGameOnFinish(game, board, result)};
			else {
				if (game.mode === 'cpu' && game.turn === game.player1.mark) makeCpuTurn();

				return {game: {...game, turn: switchMark(game.turn), board}};
			}
		}),

	quit: () => set({game: INITIAL_GAME}),

	nextRound: () => {
		set((state) => ({game: getGameOnRestart(state.game)}));

		const {game, makeCpuTurn} = get();

		if (game.mode === 'cpu' && game.player1.mark === 'O') makeCpuTurn('now');
	},

	makeCpuTurn: (moment = 'delayed') => {
		setTimeout(() => set((state) => ({game: {...state.game, cpuIsPlaying: true}})), 1);

		setTimeout(
			() =>
				set((state) => {
					const {game} = state;

					const board = playCpuTurn(game.board, game.player2.mark);
					const result = checkBoard(board);

					if (result.mark) return {game: getGameOnFinish(game, board, result)};

					return {game: {...game, turn: switchMark(game.turn), board, cpuIsPlaying: false}};
				}),
			(moment === 'now' ? 0.5 : 1) * 1000,
		);
	},
}));

export default useGameStore;
