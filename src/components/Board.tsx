import {useMemo, useState} from 'react';
import Logo from '../assets/logo.svg';
import XIcon from '../components/XIcon';
import OIcon from '../components/OIcon';
import RestartIcon from '../assets/icon-restart.svg';

export default function Board() {
	const [turn, setTurn] = useState<'X' | 'O'>('X');
	const [xPlayer, setXPlayer] = useState<'user' | 'cpu' | 'p1' | 'p2'>('user');
	const [oPlayer, setOPlayer] = useState<'user' | 'cpu' | 'p1' | 'p2'>('cpu');

	const [xPlayerScore, setXPlayerScore] = useState<number>(0);
	const [oPlayerScore, setOPlayerScore] = useState<number>(0);
	const [tiesScore, setTiesScore] = useState<number>(0);

	const xPlayerName = useMemo(
		() => (xPlayer === 'user' ? 'You' : xPlayer.toUpperCase()),
		[xPlayer],
	);
	const oPlayerName = useMemo(
		() => (oPlayer === 'user' ? 'You' : oPlayer.toUpperCase()),
		[oPlayer],
	);

	return (
		<main className='flex flex-col gap-5'>
			<header className='flex flex-row items-center justify-between'>
				<img src={Logo} alt='logo' />
				<div className='p-4 flex flex-row items-center justify-center gap-3 w-35 bg-slate-800 rounded-[10px] slate-shadow'>
					{turn === 'X' ? <XIcon color='light' size='20' /> : <OIcon color='light' size='20' />}
					<p className='text-preset-4 text-slate-300 uppercase'>Turn</p>
				</div>
				<button className='bg-slate-300 rounded-[10px] w-13 h-13 flex items-center justify-center'>
					<img src={RestartIcon} alt='restart' />
				</button>
			</header>
			<section className='grid grid-cols-3 grid-rows-3 gap-5 w-115 h-115'>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
				<button className='bg-slate-800 slate-shadow rounded-2xl'></button>
			</section>
			<section className='grid grid-cols-3 gap-5'>
				<div className='bg-teal-400 rounded-2xl flex flex-col items-center justify-center p-3'>
					<p className='text-preset-5-medium text-slate-900 uppercase'>X ({xPlayerName})</p>
					<p className='text-preset-2 text-slate-900'>{xPlayerScore}</p>
				</div>
				<div className='bg-slate-300 rounded-2xl flex flex-col items-center justify-center p-3'>
					<p className='text-preset-5-medium text-slate-900 uppercase'>Ties</p>
					<p className='text-preset-2 text-slate-900'>{tiesScore}</p>
				</div>
				<div className='bg-amber-400 rounded-2xl flex flex-col items-center justify-center p-3'>
					<p className='text-preset-5-medium text-slate-900 uppercase'>O ({oPlayerName})</p>
					<p className='text-preset-2 text-slate-900'>{oPlayerScore}</p>
				</div>
			</section>
		</main>
	);
}
