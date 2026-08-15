type Mark = 'X' | 'O';
type Cell = Mark | null;
type Combination = [number, number, number];

type GameMode = 'cpu' | 'multiplayer';
type GameState = 'initial' | 'playing' | 'finished';
type GameResult = {mark: Mark | 'tie' | null; cells: Combination};
type Player = {mark: Mark; score: number};
type GameBoard = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

type Game = {
	mode: GameMode;
	state: GameState;
	result: GameResult;
	turn: Mark;
	player1: Player;
	player2: Player;
	ties: number;
	board: GameBoard;
	cpuIsPlaying: boolean;
};
