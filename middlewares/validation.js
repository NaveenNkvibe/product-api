const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
	body('username').notEmpty().withMessage('Username is required'), // Check if username is available
	body('email').isEmail().withMessage('Invalid email format'), // Check if email format is correct
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Check if password has atleast 6 characters
	(req, res, next) => {
		const errors = validationResult(req); // It extracts validation errors from the req
		if (!errors.isEmpty()) { // checks if there are validation errors
			return res.status(400).json({ errors: errors.array() }); // Returns response
		}
		next(); // Passes control to the next middleware
	},
]; // User Register validation

const validateUserLogin = [
	body('email').isEmail().withMessage('Invalid email format'), // Check if email format is correct
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Check if password has atleast 6 characters
	(req, res, next) => {
		const errors = validationResult(req); // It extracts validation errors from the req
		if (!errors.isEmpty()) { // checks if there are validation errors
			return res.status(400).json({ errors: errors.array() }); // Returns response
		}
		next(); // Passes control to the next middleware
	},
]; // User Login validation

const validateEditUser = [
	body('username').notEmpty().withMessage('Username is required'), // Check if username is available
	body('email').isEmail().withMessage('Invalid email format'), // Check if email format is correct
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Check if password has atleast 6 characters
	(req, res, next) => {
		const errors = validationResult(req); // It extracts validation errors from the req
		if (!errors.isEmpty()) { // checks if there are validation errors
			return res.status(400).json({ errors: errors.array() }); // Returns response
		}
		next(); // Passes control to the next middleware
	},
]; // User Edit validation

const validateCreateBrand = [
	body('brandName').notEmpty().withMessage('Brand name is required'), // Check if brand name is available
	body('categories').notEmpty().isArray({ min: 1 }).withMessage('At least one category is required'), // Check if categories array atleast have one value in it
	(req, res, next) => {
		const errors = validationResult(req); // It extracts validation errors from the req
		if (!errors.isEmpty()) {
			// checks if there are validation errors
			return res.status(400).json({ errors: errors.array() }); // Returns response
		}
		next(); // Passes control to the next middleware
	},
]; // Brand Carete validation

const validateCreateProduct = [
	body('productName').notEmpty().withMessage('Product name is required'), // Check if product name is available
	body('description').notEmpty().withMessage('Description is required'), // Check if description is available
	body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'), // Check if price value is greater that 0
	body('category').notEmpty().withMessage('Category is required'), // Check if category is available
	body('brand').notEmpty().withMessage('Brand is required'), // Check if brand is available
	(req, res, next) => {
		const errors = validationResult(req); // It extracts validation errors from the req
		if (!errors.isEmpty()) { // checks if there are validation errors
			return res.status(400).json({ errors: errors.array() }); // Returns response
		}
		next(); // Passes control to the next middleware
	},
]; // Product Create validation

const validateEditProduct = [
	body('productName').notEmpty().withMessage('Product name is required'), // Check if product name is available
	body('description').notEmpty().withMessage('Description is required'), // Check if description is available
	body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'), // Check if price value is greater that 0
	body('category').notEmpty().withMessage('Category is required'), // Check if category is available
	body('brand').notEmpty().withMessage('Brand is required'), // Check if brand is available
	(req, res, next) => {
		const errors = validationResult(req); // It extracts validation errors from the req
		if (!errors.isEmpty()) { // checks if there are validation errors
			return res.status(400).json({ errors: errors.array() }); // Returns response
		}
		next(); // Passes control to the next middleware
	},
]; // Product Edit validation

module.exports = {
	validateUserRegistration, validateUserLogin, validateEditUser, validateCreateBrand, validateCreateProduct, validateEditProduct,
};