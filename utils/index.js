const utils = {
    successResponse: (res, data, message = "Success") => {
		return res.status(200).json({
			success: true,
			message,
			data,
		});
	},
	errorResponse: (res, err, message = "Internal Server Error") => {
		console.error(err);
		return res.status(400).json({
			success: false,
			message,
			data: err,
		});
	}

}

module.exports = utils