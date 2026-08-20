import {useMemo, useState} from 'react';
import {getMarks} from '../utils/getMarks';
import {useResponsive} from '../utils/useResponsive';

import Logo from '../assets/logo.svg';
import XIcon from '../components/XIcon';
import OIcon from '../components/OIcon';
import RestartIcon from '../assets/icon-restart.svg';
import useGameStore from '../stores/game';
import Cell from './Cell';
import Result from './Result';
import Alert from './Alert';

export default function Board() {
	const {game, restart, markCell} = useGameStore();
	const {isMobile} = useResponsive();

	const {xPlayer, oPlayer} = useMemo(() => getMarks(game), [game]);

	const [showRestartConfirmation, setShowRestartConfirmation] = useState<boolean>(false);

	const onCancelRestart = () => {
		setShowRestartConfirmation(false);
	};

	const onConfirmRestart = () => {
		restart();
		setShowRestartConfirmation(false);
	};

	return (
		<main className='flex flex-col gap-5'>
			<header className='flex flex-row items-center justify-between'>
				<img src={Logo} alt='Tic Tac Toe' />
				<div
					className='p-4 flex flex-row items-center justify-center gap-3 w-35 bg-slate-800 rounded-base small-slate-shadow'
					aria-label={`Current turn: ${game.turn === 'X' ? 'Player 1' : 'Player 2'}`}>
					{game.turn === 'X' ? (
						<XIcon color='light' size={isMobile ? '16' : '20'} />
					) : (
						<OIcon color='light' size={isMobile ? '16' : '20'} />
					)}
					<p className='text-preset-5-bold sm:text-preset-4 text-slate-300 uppercase'>Turn</p>
				</div>
				<button
					className='bg-slate-300 hover:bg-slate-100 cursor-pointer gray-shadow rounded-base w-10 h-10 sm:w-13 sm:h-13 flex items-center justify-center'
					onClick={() => setShowRestartConfirmation(true)}>
					<img src={RestartIcon} alt='restart' />
				</button>
			</header>
			<section className='grid grid-cols-3 grid-rows-3 gap-5 w-82 h-82 sm:w-115 sm:h-115'>
				{game.board.map((cell, index) => (
					<Cell key={index} index={index} mark={cell} onClick={() => markCell(index)} />
				))}
			</section>
			<section className='grid grid-cols-3 gap-5'>
				<div className='bg-teal-400 rounded-2xl flex flex-col items-center justify-center p-3'>
					<p className='text-preset-6 sm:text-preset-5-medium text-slate-900 uppercase'>
						X ({xPlayer.name})
					</p>
					<p className='text-preset-3 sm:text-preset-2 text-slate-900'>{xPlayer.score}</p>
				</div>
				<div className='bg-slate-300 rounded-2xl flex flex-col items-center justify-center p-3'>
					<p className='text-preset-6 sm:text-preset-5-medium text-slate-900 uppercase'>Ties</p>
					<p className='text-preset-3 sm:text-preset-2 text-slate-900'>{game.ties}</p>
				</div>
				<div className='bg-amber-400 rounded-2xl flex flex-col items-center justify-center p-3'>
					<p className='text-preset-6 sm:text-preset-5-medium text-slate-900 uppercase'>
						O ({oPlayer.name})
					</p>
					<p className='text-preset-3 sm:text-preset-2 text-slate-900'>{oPlayer.score}</p>
				</div>
			</section>
			<Result />
			{showRestartConfirmation && (
				<Alert
					title='Restart Game?'
					cancelText='No, cancel'
					confirmText='Yes, restart'
					onCancel={onCancelRestart}
					onConfirm={onConfirmRestart}
				/>
			)}
		</main>
	);
}
