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
	const products = await Product.find(find)
	.limit(objectPagination.limitPage)
	.skip(objectPagination.skipPage)
	.sort({position: "desc"});
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
	req.flash("success", "Cập nhật trạng thái sản phẩm thành công")
	const referer = req.get('Referer');
	res.redirect(referer);	
}

//[PATCH] admin/products/change-multi

module.exports.changeMulti = async (req,res) => {
	console.log(req.body);
	
	const type = req.body.type;
	const id = req.body.ids.split(', ');
	
	switch(type){
		case "active":
			await Product.updateMany({_id: { $in: id}}, {status: 'active'})
			req.flash("success", `Cập nhật trạng thái thành công ${id.length} sản phẩm`)
			break;
		case "inactive":
			await Product.updateMany({_id: { $in: id}}, {status: 'inactive'})
			req.flash("success", `Cập nhật trạng thái thành công ${id.length} sản phẩm`)
			break;
		case "delete-all":
			await Product.updateMany({_id: { $in: id}}, {deleted: 'true', deletedAt: new Date()})
			req.flash("success", `Đã xóa thành công ${id.length} sản phẩm`)
			break;
		case "change-position":
			const bulkOps = id.map(item => {
				const [id, position] = item.split('-')
				return {
					updateOne: {
						filter: {_id: id},
						update: { $set: {position: position}}
					}
				};
			});
			await Product.bulkWrite(bulkOps);
			req.flash("success", `Đã thay đổi vị trí thành công ${id.length} sản phẩm`)
			break;

		default:
			break;	
	}
	const referer = req.get('Referer');
	res.redirect(referer);
	
}
//[DELETE] admin/products/delete/:id

module.exports.deleteProduct = async(req, res) => {
	await Product.updateOne({_id:req.params.id }, {deleted: true, deletedAt: new Date()})
	req.flash("success", `Đã xóa thành công sản phẩm`)
	const referer = req.get('Referer');
	res.redirect(referer);
}

//[GET] admin/products/create
module.exports.create = async(req, res) => {
	res.render('admin/pages/products/create.pug')
}

//[POST] admin/products/create
module.exports.postCreate = async(req, res) => {
	req.body.price = parseInt(req.body.price);
	req.body.stock = parseInt(req.body.stock);
	req.body.discountPercentage = parseInt(req.body.discountPercentage);
	if(req.body.position == ''){
		const count = await Product.countDocuments();
		req.body.position = count + 1;
	}else{
		req.body.position = parseInt(req.body.position)
	}
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect('/admin/products')
}

