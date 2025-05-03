const mongoose = require('mongoose');
const yourSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	discountPercentage: Number,
	stock: Number,
	thumbnail: String,
	status: String,
	position: Number,
	deleted: {
		type: Boolean,
		default: false
	},
	deletedAt: Date
	});

const Product = mongoose.model('Product', yourSchema, 'products');

module.exports = Product;