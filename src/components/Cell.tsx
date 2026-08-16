import {useMemo, useState} from 'react';
import useGameStore from '../stores/game';
import {useResponsive} from '../utils/useResponsive';

import XIcon from './XIcon';
import OIcon from './OIcon';

export default function Cell({
	index,
	mark,
	onClick,
}: {
	index: number;
	mark: 'X' | 'O' | null;
	onClick: () => void;
}) {
	const {game} = useGameStore();
	const {isMobile} = useResponsive();

	const [isHovered, setIsHovered] = useState<boolean>(false);

	const isWinnerCell = useMemo(
		() =>
			game.result.cells.includes(index) && game.result.mark !== 'tie' && game.result.mark !== null,
		[game.result, index],
	);

	return (
		<button
			className={`slate-shadow rounded-2xl flex items-center justify-center cursor-pointer ${mark === 'X' && isWinnerCell ? 'bg-teal-500' : mark === 'O' && isWinnerCell ? 'bg-amber-500' : 'bg-slate-800'} ${game.cpuIsPlaying ? 'cursor-not-allowed' : ''}`}
			aria-label={`Cell ${index + 1} ${mark ? `marked with ${mark}` : 'empty'}`}
			onClick={onClick}
			disabled={game.cpuIsPlaying}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{mark === 'X' ? (
				isWinnerCell ? (
					<XIcon size={isMobile ? '40' : undefined} style='combined' />
				) : (
					<XIcon size={isMobile ? '40' : undefined} />
				)
			) : mark === 'O' ? (
				isWinnerCell ? (
					<OIcon size={isMobile ? '40' : undefined} style='combined' />
				) : (
					<OIcon size={isMobile ? '40' : undefined} />
				)
			) : isHovered && !game.result.mark && !game.cpuIsPlaying ? (
				game.turn === 'X' ? (
					<XIcon size={isMobile ? '40' : undefined} style='outlined' />
				) : (
					<OIcon size={isMobile ? '40' : undefined} style='outlined' />
				)
			) : null}
		</button>
	);
}
