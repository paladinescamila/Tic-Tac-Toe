import {create} from 'zustand';
import {switchMark} from '../utils/switchMark';
import {INITIAL_RESULT, INITIAL_BOARD} from '../constants/initialStates';
import {checkBoard} from '../utils/checkBoard';

interface GameStore {
	game: Game;
	startGameWithCPU: (player1Mark: Mark) => void;
	startGameWithPlayer: (player1Mark: Mark) => void;
	restart: () => void;
	markCell: (index: number) => void;
}

const useGameStore = create<GameStore>((set) => ({
	game: {
		mode: 'cpu',
		state: 'initial',
		result: INITIAL_RESULT,
		turn: 'X',
		player1: {mark: 'X', score: 0},
		player2: {mark: 'O', score: 0},
		ties: 0,
		board: INITIAL_BOARD,
	},

	startGameWithCPU: (player1Mark) =>
		set({
			game: {
				mode: 'cpu',
				state: 'playing',
				result: INITIAL_RESULT,
				turn: 'X',
				player1: {mark: player1Mark, score: 0},
				player2: {mark: switchMark(player1Mark), score: 0},
				ties: 0,
				board: INITIAL_BOARD,
			},
		}),

	startGameWithPlayer: (player1Mark) =>
		set({
			game: {
				mode: 'multiplayer',
				state: 'playing',
				result: INITIAL_RESULT,
				turn: 'X',
				player1: {mark: player1Mark, score: 0},
				player2: {mark: switchMark(player1Mark), score: 0},
				ties: 0,
				board: INITIAL_BOARD,
			},
		}),

	restart: () => set((state) => ({game: {...state.game, turn: 'X', board: INITIAL_BOARD}})),

	markCell: (index) =>
		set((state) => {
			const {game} = state;

			if (game.board[index] !== null || game.state !== 'playing') return state;

			const board: Game['board'] = [...game.board];
			board[index] = game.turn;

			const result = checkBoard(board);

			if (result.mark) {
				return {
					game: {
						...game,
						state: 'finished',
						result,
						turn: 'X',
						player1: {
							...game.player1,
							score:
								result.mark === game.player1.mark ? game.player1.score + 1 : game.player1.score,
						},
						player2: {
							...game.player2,
							score:
								result.mark === game.player2.mark ? game.player2.score + 1 : game.player2.score,
						},
						ties: result.mark === 'tie' ? game.ties + 1 : game.ties,
						board,
					},
				};
			} else return {game: {...game, turn: switchMark(game.turn), board}};
		}),
}));

export default useGameStore;
