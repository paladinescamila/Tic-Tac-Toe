import {useEffect, useMemo, useState} from 'react';

/**
 * A custom React hook that provides responsive design capabilities by tracking the window width and determining if the device is mobile or not.
 * @returns An object containing the current window width and a boolean indicating if the device is mobile.
 */
export const useResponsive = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobile = useMemo(() => width < 640, [width]);

	return {width, isMobile};
};
