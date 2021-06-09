export const CapitalizeLetter = string => {
	const [FirstLetter, ...restLetter] = string.split("");

	return [FirstLetter.toUpperCase(), ...restLetter].join("");
};
