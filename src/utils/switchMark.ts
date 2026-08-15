/**
 * Switches the current mark to the other mark.
 * @param currentMark The current mark.
 * @returns The other mark.
 */
export const switchMark = (currentMark: Mark): Mark => (currentMark === 'X' ? 'O' : 'X');
