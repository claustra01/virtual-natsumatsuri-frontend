export function generateQueryParams(
	params: Record<string, string | number>,
): string {
	const searchParams = new URLSearchParams();
	// biome-ignore lint/complexity/noForEach: <explanation>
	Object.entries(params).forEach(([key, value]) => {
		searchParams.append(key, String(value));
	});
	return searchParams.toString();
}

export function appendQueryParamsToUrl(
	baseUrl: string,
	params: Record<string, string | number>,
): string {
	const queryString = generateQueryParams(params);
	const separator = baseUrl.includes("?") ? "&" : "?";
	return `${baseUrl}${separator}${queryString}`;
}
