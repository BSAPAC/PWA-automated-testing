const upperCaseFistLowerCaseRest = (word) => {
	return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
};

module.exports = {
	upperCaseFistLowerCaseRest,
};
