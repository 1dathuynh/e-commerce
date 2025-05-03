"use strict";

var express = require('express');

var router = express.Router();

var controller = require('../../controllers/admin/products.controller');

router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi/', controller.changeMulti);
router["delete"]('/delete/:id', controller.deleteProduct);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);
module.exports = router;