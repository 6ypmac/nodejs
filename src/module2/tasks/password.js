const crypto = require('crypto');

const charsets = {
    NUMBERS: '0123456789',
    LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
    UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

const generatePassword = () => {    
    const { NUMBERS, LOWERCASE, UPPERCASE } = charsets;
    const charset = NUMBERS + LOWERCASE + UPPERCASE;
	const charsetLength = charset.length;

    let passwordLength = 12;
	let password = '';

	while (passwordLength--) {
		password += charset[crypto.randomInt(charsetLength)];
	}

	return password;
}

module.exports = generatePassword;