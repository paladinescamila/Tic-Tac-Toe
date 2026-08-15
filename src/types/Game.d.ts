type Mark = 'X' | 'O';
type Cell = Mark | null;
type Combination = [number, number, number];

type Game = {
	mode: 'cpu' | 'multiplayer';
	state: 'initial' | 'playing' | 'finished';
	result: {mark: Mark | 'tie' | null; cells: Combination};
	turn: Mark;
	player1: {mark: Mark; score: number};
	player2: {mark: Mark; score: number};
	ties: number;
	board: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
};
