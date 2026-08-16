import React from 'react';
import {createPortal} from 'react-dom';

export default function Alert({
	title,
	subtitle,
	icon,
	color,
	cancelText,
	confirmText,
	onCancel,
	onConfirm,
}: {
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
	color?: 'teal' | 'amber' | 'default';
	cancelText: string;
	confirmText: string;
	onCancel?: () => void;
	onConfirm?: () => void;
}) {
	return createPortal(
		<section className='absolute inset-0 bg-neutral-950/50 flex items-center justify-center'>
			<div
				className='flex flex-col items-center justify-center w-full py-12 px-4 sm:px-12 bg-slate-800'
				role='alertdialog'
				aria-modal='true'>
				{subtitle && (
					<p className='text-preset-5-bold sm:text-preset-4 text-slate-300 uppercase'>{subtitle}</p>
				)}
				<div className='pt-4 pb-6 flex flex-row items-center justify-center gap-6'>
					{icon}
					<p
						className={`text-preset-2 sm:text-preset-1 uppercase ${color === 'teal' ? 'text-teal-400' : color === 'amber' ? 'text-amber-400' : 'text-slate-300'}`}>
						{title}
					</p>
				</div>
				<div className='flex flex-row gap-6 items-center justify-center'>
					<button
						className='text-preset-4 text-slate-900 bg-slate-300 hover:bg-slate-100 gray-shadow uppercase rounded-base p-4 cursor-pointer'
						onClick={onCancel}>
						{cancelText}
					</button>
					<button
						className='text-preset-4 text-slate-900 bg-amber-400 hover:bg-amber-300 amber-shadow uppercase rounded-base p-4 cursor-pointer'
						onClick={onConfirm}>
						{confirmText}
					</button>
				</div>
			</div>
		</section>,
		document.body,
	);
}
