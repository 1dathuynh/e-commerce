const ProductCategory =  require("../../models/product-categoryModel")
const prefixAdmin = require("../../config/system")
const filterStatusHelpers = require('../../helpers/filter-status')
const searchHelpers = require('../../helpers/search')
const paginationHelpers = require('../../helpers/pagination')
const treeCategoryHelpers = require('../../helpers/tree-category')

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
	let find = {
		delete: false
	}
	//bo loc trang thai
	filterStatus = filterStatusHelpers(req.query);
	// xử lý tìm kiếm keyword
		const search = searchHelpers(req.query);
		if(search.keyword){
			find.title = search.regex
		}
		//end xử lý tìm kiếm keyword
	//sort
	if(req.query.status){
		find.status = req.query.status 
	}
	//pagination
	const countProduct = await ProductCategory.countDocuments(find);
	
	//end pagination	
	sort = {};
	if(req.query.sortKey && req.query.sortValue){
		sort[req.query.sortKey] = req.query.sortValue
	}else{
		sort.position = "desc"
	}
	// end sort
	const record = await ProductCategory.find(find)
	.sort(sort)
	const allCate = await ProductCategory.find(find)
	const catMap = new Map(allCate.map(c => [c._id.toString(), c.title]))
	
	record.forEach(item => {
		item.parent_title = catMap.get(item.parent_id?.toString())
	})
	
	const newRecord = treeCategoryHelpers.treeCategory(record)
	
	
	res.render('admin/pages/products-category/index', {
		pageTitle: 'Danh mục sản phẩm',
		record: newRecord,
		filterStatus: filterStatus,
		keyword: search.keyword,
	});
}

//[GET] admin/products-category/create
module.exports.create = async(req, res) => {	
	let find = {
		deleted: false
	}
	let record = await ProductCategory.find(find)
	const newRecord = treeCategoryHelpers.treeCategory(record)
	
	res.render('admin/pages/products-category/create.pug', {
		pageTitle: "Tạo danh mục sản phẩm",
		record: newRecord
	})
}

//[POST] admin/products-category/create
module.exports.postCreate = async(req, res) => {
	if(req.body.position == ''){
		const count = await ProductCategory.countDocuments();
		req.body.position = count + 1;
	}else{
		req.body.position = parseInt(req.body.position)
	}
	
	const record = new ProductCategory(req.body);
	await record.save();
	res.redirect(`${prefixAdmin.ADMIN}/products-category`)
}

//[PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
	console.log(req.params.id);
	
	await ProductCategory.updateOne({ _id: req.params.id}, { status: req.params.status})
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
			await ProductCategory.updateMany({_id: { $in: id}}, {status: 'active'})
			req.flash("success", `Cập nhật trạng thái thành công ${id.length} sản phẩm`)
			break;
		case "inactive":
			await ProductCategory.updateMany({_id: { $in: id}}, {status: 'inactive'})
			req.flash("success", `Cập nhật trạng thái thành công ${id.length} sản phẩm`)
			break;
		case "delete-all":
			await ProductCategory.updateMany({_id: { $in: id}}, {deleted: 'true', deletedAt: new Date()})
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
			await ProductCategory.bulkWrite(bulkOps);
			req.flash("success", `Đã thay đổi vị trí thành công ${id.length} sản phẩm`)
			break;

		default:
			break;	
	}
	const referer = req.get('Referer');
	res.redirect(referer);
	
	
}