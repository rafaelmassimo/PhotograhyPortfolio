export const splitAndCapitalize = (input: string) => {
	// Insert space before uppercase letters and & symbol (removing first space with trim())
	const withSpaces = input.replace(/([A-Z&])/g, ' $1').trim();

	// First create an array with spaces between the words and then Uppercase first letter
	const words = withSpaces.split(' ').map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
	//* Transform from an Array to a string joining each word previously on the array with a space
	return words.join(' ');
};


export const toPascalCase = (sentence: string) => {
		return sentence
		// Create an array with words separated by space 
			.split(' ')
		// Then for each word ian the loop switch the first letter to upper case and the rest to lower case
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		// Then from that array creates a string joining the word from the array with no space
			.join('');
	};