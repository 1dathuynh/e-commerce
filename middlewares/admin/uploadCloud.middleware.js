const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET

});
module.exports.upload = (req, res, next) => {
	let streamUpload = (req) => {
		return new Promise((resolve, reject) => {
			let stream = cloudinary.uploader.upload_stream(
				(error, result) => {
					if (result) {
						resolve(result);
					} else {
						reject(error);
					}
				}
			);

			streamifier.createReadStream(req.file.buffer).pipe(stream);
		});
	};

	async function upload(req) {
		try {
			if (req.file) {
				let result = await streamUpload(req);
				req.body[req.file.fieldname] = result.url
			}
			next();
		} catch (error) {
			console.log(error);
			next();
		}
	}
	upload(req);
}