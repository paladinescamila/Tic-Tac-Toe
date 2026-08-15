import useGameStore from './stores/game';

import PickMark from './components/PickMark';
import Board from './components/Board';

function App() {
	const {game} = useGameStore();

	return game.state === 'initial' ? <PickMark /> : <Board />;
}

export default App;
