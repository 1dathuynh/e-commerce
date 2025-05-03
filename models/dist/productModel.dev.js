"use strict";

var mongoose = require('mongoose');

var yourSchema = new mongoose.Schema({
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
    "default": false
  },
  deletedAt: Date
});
var Product = mongoose.model('Product', yourSchema, 'products');
module.exports = Product;