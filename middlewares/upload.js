const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createDirectory = (dirPath) => {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}; // Create new directory if not available

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let uploadPath = 'uploads/';
		if (file.fieldname === 'profile_photo') uploadPath += 'profile_photo/';
		else if (file.fieldname === 'brand_logo') uploadPath += 'brand_logo/';
		else if (file.fieldname === 'product_image') uploadPath += 'product_image/';

		createDirectory(uploadPath);

		cb(null, uploadPath);
	}, // Specifies the folder where files will be saved

	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}, // Create a unique filename for each upload
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Only .jpeg/.png/.jpg Formats are Allowed!'), false);
	}
}; // Checks if the uploaded file type is allowed

const upload = multer({
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 }, // Setting sizee limit to 2MB
	fileFilter: fileFilter,
}); // Configuring multer

module.exports = upload;