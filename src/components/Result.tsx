import useGameStore from '../stores/game';

import Alert from './Alert';
import OIcon from './OIcon';
import XIcon from './XIcon';

export default function Result() {
	const {game, quit, nextRound} = useGameStore();

	if (!game.result.mark) return null;

	return (
		<Alert
			title={game.result.mark !== 'tie' ? 'Takes the round' : 'Round tied'}
			subtitle={
				game.mode === 'cpu'
					? game.result.mark === game.player1.mark
						? 'You won!'
						: game.result.mark === game.player2.mark
							? 'Oh no, you lost...'
							: ''
					: game.result.mark === game.player1.mark
						? 'Player 1 wins!'
						: game.result.mark === game.player2.mark
							? 'Player 2 wins!'
							: ''
			}
			icon={game.result.mark === 'X' ? <XIcon /> : game.result.mark === 'O' ? <OIcon /> : null}
			color={game.result.mark === 'X' ? 'teal' : game.result.mark === 'O' ? 'amber' : 'default'}
			cancelText='Quit'
			confirmText='Next round'
			onCancel={quit}
			onConfirm={nextRound}
		/>
	);
}
