export const copyStringToClipboard = (text: string) => {
	navigator.clipboard.writeText(text).then(
		() => {},
		(err) => {
			console.error("Async: Could not copy text: ", err);
		},
	);
};
