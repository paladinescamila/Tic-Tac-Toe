import {useState} from 'react';
import Logo from '../assets/logo.svg';
import XIcon from '../components/XIcon';
import OIcon from '../components/OIcon';

export default function PickMark() {
	const [player1Mark, setPlayer1Mark] = useState<'X' | 'O'>('O');

	return (
		<main className='w-115 flex flex-col gap-10 items-center'>
			<header>
				<img src={Logo} alt='logo' />
			</header>
			<section className='px-6 py-5 flex flex-col gap-6 items-center justify-center bg-slate-800 rounded-2xl slate-shadow'>
				<h1 className='text-preset-4 text-slate-300 uppercase text-center'>Pick player 1's mark</h1>
				<div className='flex flex-row items-center p-2 rounded-[10px] bg-slate-900'>
					<button
						className={`w-49.5 h-13.5 flex items-center justify-center rounded-[10px] cursor-pointer ${player1Mark === 'X' ? 'bg-slate-300' : 'bg-transparent'}`}
						onClick={() => setPlayer1Mark('X')}>
						<XIcon color={player1Mark === 'X' ? 'dark' : 'light'} size='32' />
					</button>
					<button
						className={`w-49.5 h-13.5 flex items-center justify-center rounded-[10px] cursor-pointer ${player1Mark === 'O' ? 'bg-slate-300' : 'bg-transparent'}`}
						onClick={() => setPlayer1Mark('O')}>
						<OIcon color={player1Mark === 'O' ? 'dark' : 'light'} size='32' />
					</button>
				</div>
				<p className='text-preset-5-medium text-slate-300 uppercase text-center'>
					Remember: X goes first
				</p>
			</section>
			<section className='flex flex-col gap-5 w-full'>
				<button className='text-preset-3 text-slate-900 rounded-2xl p-4 bg-amber-400 amber-shadow uppercase'>
					New Game (vs CPU)
				</button>
				<button className='text-preset-3 text-slate-900 rounded-2xl p-4 bg-teal-400 teal-shadow uppercase'>
					New Game (vs Player)
				</button>
			</section>
		</main>
	);
}
