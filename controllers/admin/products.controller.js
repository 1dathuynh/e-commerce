// [GET] /admin/products
const Product = require('../../models/productModel')
const filterStatusHelpers = require('../../helpers/filter-status')
const searchHelpers = require('../../helpers/search')
const paginationHelpers = require('../../helpers/pagination')
module.exports.index = async (req, res) => {
	let find = {
		deleted: false,
	};
	// bộ lọc trạng thái
	filterStatus = filterStatusHelpers(req.query);
	
	//end bộ lọc trạng thái
	// xử lý tìm kiếm keyword
	const search = searchHelpers(req.query);
	if(search.keyword){
		find.title = search.regex
	}
	//end xử lý tìm kiếm keyword

	if(req.query.status){
		find.status = req.query.status 
	}
	//pagination
	const countProduct = await Product.countDocuments(find);

	const objectPagination = paginationHelpers( {
		limitPage: 3,
		curentPage: 1,
	}, req.query, countProduct)
	
	//end pagination	
	const products = await Product.find(find).limit(objectPagination.limitPage).skip(objectPagination.skipPage);
	res.render('admin/pages/products/index', {
		title: 'Products',
		products: products,
		filterStatus: filterStatus,
		keyword: search.keyword,
		pagination: objectPagination
	});
}

//[PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
	await Product.updateOne({ _id: req.params.id}, { status: req.params.status})
	const referer = req.get('Referer');
	res.redirect(referer);
}

//[PATCH] admin/products/change-multi

module.exports.changeMulti = async (req,res) => {
	const type = req.body.type;
	const id = req.body.ids.split(', ');
	switch(type){
		case "active":
			await Product.updateMany({_id: { $in: id}}, {status: 'active'})
			break;
		case "inactive":
			await Product.updateMany({_id: { $in: id}}, {status: 'inactive'})
			break;
		default:
			break;	
	}
	const referer = req.get('Referer');
	res.redirect(referer);
	
}