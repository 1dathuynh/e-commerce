const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer()
const controller = require('../../controllers/admin/productsCategory.controller');

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')

router.get('/', controller.index);
router.get('/create', controller.create);
router.patch('/change-status/:status/:id', controller.changeStatus)
router.patch('/change-multi', controller.changeMulti)
router.post(
	'/create',
	upload.single('thumbnail'),
	uploadCloud.upload,
	controller.postCreate
)


module.exports = router
