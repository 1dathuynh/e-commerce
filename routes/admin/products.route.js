const express = require('express');
const multer = require('multer');
const upload = multer()
const router = express.Router();
const controller = require('../../controllers/admin/products.controller');
const validate = require("../../validates/admin/products.validate")

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi/', controller.changeMulti)
router.delete('/delete/:id', controller.deleteProduct)
router.get('/create', controller.create)
router.post(
	'/create',
	upload.single('thumbnail'),
	uploadCloud.upload,
	validate.postCreate,
	controller.postCreate
)
router.get('/edit/:id', controller.edit)
router.patch(
	'/edit/:id',
	upload.single('thumbnail'),
	uploadCloud.upload,
	validate.postCreate,
	controller.patchEdit
)
router.get('/details/:id', controller.details)
module.exports = router;