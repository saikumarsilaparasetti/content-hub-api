const crypto = require("crypto");

const ALGORITHM = process.env.ALGORITHM;
const ENCODING = "hex";
const IV_LENGTH = 16;
const KEY = process.env.KEY;

const encryptService = {
	encrypt: (text) => {
		const iv = crypto.randomBytes(IV_LENGTH);
		const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return `${iv.toString(ENCODING)}:${encrypted.toString(ENCODING)}`;
	},
	decrypt: (text) => {
		const textParts = text.split(":");
		const iv = Buffer.from(textParts.shift(), ENCODING);
		const encryptedText = Buffer.from(textParts.join(":"), ENCODING);
		const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	},
};

module.exports = encryptService;

// const data = encryptService.decrypt(
// 	"a57fa96407290cb4b9c69ff967824043:9724d5e4f03f037275aa1a47bf01c7f28a4875fc3c95043d6a8632a8870b8ae5bcfd3b3f9a4b42e648ee2b73cb5e38a5"
// );
// // console.log(JSON.parse(data));
// const id = { user: "63e917af30f998718c77d587" };
// const token = encryptService.encrypt(JSON.stringify(id));
// console.log("🚀 ~ file: encryptor.js:37 ~ token:", token);
