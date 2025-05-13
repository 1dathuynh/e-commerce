// [GET] /admin/products
const Product = require('../../models/productModel')
const filterStatusHelpers = require('../../helpers/filter-status')
const searchHelpers = require('../../helpers/search')
const paginationHelpers = require('../../helpers/pagination')
const prefixAdmin = require("../../config/system")
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
	if(req.file){
		req.body.thumbnail = `/uploads/${req.file.filename}`

	}
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect(`${prefixAdmin.ADMIN}/products`)
}


//[GET] admin/products/edit
module.exports.edit = async(req, res) => {
	try{
		const id = req.params.id;
		const find = {
			delete: false,
			_id: id
		}
		const product = await Product.findOne(find);	
		
		res.render('admin/pages/products/edit', {
			pageTitle: "Chỉnh sửa sản phẩm",
			product: product
		});
	} catch(error){
		req.flash("error", "Vui lòng nhập đúng id sản phẩm")
		res.redirect(`${prefixAdmin.ADMIN}/products`)
	}	
}

//[PATCH] admin/products/edit/id
module.exports.patchEdit = async(req, res) => {
		req.body.price = parseInt(req.body.price);
		req.body.stock = parseInt(req.body.stock);
		req.body.discountPercentage = parseInt(req.body.discountPercentage);
		req.body.position = parseInt(req.body.position)

		if(req.file){
			req.body.thumbnail = `/uploads/${req.file.filename}`
		}
		try {
			await Product.updateOne({_id: req.params.id}, req.body)
			req.flash("success", "Cập nhật sản phẩm thành công")
		} catch (error) {
			console.log("Có lỗi xảy ra");
		}
		const referer = req.get('Referer');
		res.redirect(referer);
}

//[GET] admin/products/details
module.exports.details = async(req, res) => {
	try{
		const id = req.params.id;
		const find = {
			delete: false,
			_id: id
		}
		const product = await Product.findOne(find);	

		
		res.render('admin/pages/products/detail', {
			pageTitle: product.title,
			product: product
		});
	} catch(error){
		req.flash("error", "Vui lòng nhập đúng id sản phẩm")
		res.redirect(`${prefixAdmin.ADMIN}/products`)
	}	
}