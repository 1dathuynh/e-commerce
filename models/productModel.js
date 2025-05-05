const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const yourSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	discountPercentage: Number,
	stock: Number,
	thumbnail: String,
	status: String,
	position: Number,
	slug: {
		type: String,
		slug: "title",
		unique: true
	},
	deleted: {
		type: Boolean,
		default: false
	},
	deletedAt: Date
	}, {
		timestamps: true
	});

const Product = mongoose.model('Product', yourSchema, 'products');

module.exports = Product;