import {ICONS_COLORS} from '../constants/colors';

export default function XIcon({
	color = 'teal',
	size = '64',
	style = 'filled',
}: {
	color?: 'amber' | 'teal' | 'dark' | 'light';
	size?: string;
	style?: 'filled' | 'outlined' | 'combined';
}) {
	return (
		<svg width={size} height={size} viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z'
				fill={
					style === 'filled'
						? ICONS_COLORS[color]
						: style === 'combined'
							? ICONS_COLORS.transparent
							: 'none'
				}
				fill-rule='evenodd'
				stroke={style === 'outlined' || style === 'combined' ? ICONS_COLORS[color] : 'none'}
				stroke-width={style === 'outlined' ? '2' : '0'}
			/>
		</svg>
	);
}
