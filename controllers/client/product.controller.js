// [GET] /products
const Product = require('../../models/productModel')
module.exports.index = async (req, res) => {
	const products = await  Product.find(
		{
			deleted: false,
			status: 'active',
		}
	)
	.sort({position: "desc"});
	const newProduct = products.map(item => {
		item.priceNew = (item.price - (item.price * item.discountPercentage) / 100).toFixed(0);
		return item;
	})

	res.render('client/pages/products/index', {
		pageTitle: 'Product Page',
		products: newProduct,
	})
}