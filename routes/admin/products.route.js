const express = require('express');
const multer = require('multer');
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({ storage: storageMulter() })

const router = express.Router();

const controller = require('../../controllers/admin/products.controller');
const validate = require("../../validates/admin/products.validate")

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi/', controller.changeMulti)
router.delete('/delete/:id', controller.deleteProduct)
router.get('/create', controller.create)
router.post(
	'/create',
	upload.single('thumbnail'),
	validate.postCreate,
	controller.postCreate
)
router.get('/edit/:id', controller.edit)
router.patch(
	'/edit/:id',
	upload.single('thumbnail'),
	validate.postCreate,
	controller.patchEdit
)
router.get('/details/:id', controller.details)
module.exports = router;