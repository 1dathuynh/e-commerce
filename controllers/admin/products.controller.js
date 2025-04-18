// [GET] /admin/products
const Product = require('../../models/productModel')
const filterStatus = require('../../helpers/filter-status')
module.exports.index = async (req, res) => {
	filter = filterStatus(req.query);
	
	let find = {
		deleted: false,
	};
	// xử lý tìm kiếm keyword
	if(req.query.keyword){
		const keyword = new RegExp(req.query.keyword, 'i');
		find.title = keyword;
	}

	if(req.query.status){
		find.status = req.query.status 
	}
	const products = await Product.find(find);
	res.render('admin/pages/products/index', {
		title: 'Products',
		products: products,
		filterStatus: filter,
		keyword: req.query.keyword
	});
}