// [GET] /admin/products
const Product = require('../../models/productModel')
const filterStatusHelpers = require('../../helpers/filter-status')
const searchHelpers = require('../../helpers/search')
module.exports.index = async (req, res) => {
	filterStatus = filterStatusHelpers(req.query);
	
	let find = {
		deleted: false,
	};
	// xử lý tìm kiếm keyword
	const search = searchHelpers(req.query);
	if(search.keyword){
		find.title = search.regex
	}

	if(req.query.status){
		find.status = req.query.status 
	}
	const products = await Product.find(find);
	res.render('admin/pages/products/index', {
		title: 'Products',
		products: products,
		filterStatus: filterStatus,
		keyword: search.keyword
	});
}