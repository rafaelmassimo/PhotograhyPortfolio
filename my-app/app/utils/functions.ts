export const splitAndCapitalize = (input: string) => {
	// Insert space before uppercase letters and & symbol (except the first char)
	const withSpaces = input.replace(/([A-Z&])/g, ' $1').trim();

	// Capitalize first letter of each word
	const words = withSpaces.split(' ').map((word, i) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	return words.join(' ');
};
