export const generateUUID = (): string => {
	const timestamp = Date.now().toString(16);
	const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
	return `${timestamp}-${randomHex}`;
};
