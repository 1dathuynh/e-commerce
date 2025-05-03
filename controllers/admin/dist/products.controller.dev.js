"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// [GET] /admin/products
var Product = require('../../models/productModel');

var filterStatusHelpers = require('../../helpers/filter-status');

var searchHelpers = require('../../helpers/search');

var paginationHelpers = require('../../helpers/pagination');

module.exports.index = function _callee(req, res) {
  var find, search, countProduct, objectPagination, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          find = {
            deleted: false
          }; // bộ lọc trạng thái

          filterStatus = filterStatusHelpers(req.query); //end bộ lọc trạng thái
          // xử lý tìm kiếm keyword

          search = searchHelpers(req.query);

          if (search.keyword) {
            find.title = search.regex;
          } //end xử lý tìm kiếm keyword


          if (req.query.status) {
            find.status = req.query.status;
          } //pagination


          _context.next = 7;
          return regeneratorRuntime.awrap(Product.countDocuments(find));

        case 7:
          countProduct = _context.sent;
          objectPagination = paginationHelpers({
            limitPage: 3,
            curentPage: 1
          }, req.query, countProduct); //end pagination	

          _context.next = 11;
          return regeneratorRuntime.awrap(Product.find(find).limit(objectPagination.limitPage).skip(objectPagination.skipPage).sort({
            position: "desc"
          }));

        case 11:
          products = _context.sent;
          res.render('admin/pages/products/index', {
            title: 'Products',
            products: products,
            filterStatus: filterStatus,
            keyword: search.keyword,
            pagination: objectPagination
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}; //[PATCH] admin/products/change-status/:status/:id


module.exports.changeStatus = function _callee2(req, res) {
  var referer;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: req.params.id
          }, {
            status: req.params.status
          }));

        case 2:
          req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
          referer = req.get('Referer');
          res.redirect(referer);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //[PATCH] admin/products/change-multi


module.exports.changeMulti = function _callee3(req, res) {
  var type, id, bulkOps, referer;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          type = req.body.type;
          id = req.body.ids.split(', ');
          _context3.t0 = type;
          _context3.next = _context3.t0 === "active" ? 6 : _context3.t0 === "inactive" ? 10 : _context3.t0 === "delete-all" ? 14 : _context3.t0 === "change-position" ? 18 : 23;
          break;

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: id
            }
          }, {
            status: 'active'
          }));

        case 8:
          req.flash("success", "C\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i th\xE0nh c\xF4ng ".concat(id.length, " s\u1EA3n ph\u1EA9m"));
          return _context3.abrupt("break", 24);

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: id
            }
          }, {
            status: 'inactive'
          }));

        case 12:
          req.flash("success", "C\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i th\xE0nh c\xF4ng ".concat(id.length, " s\u1EA3n ph\u1EA9m"));
          return _context3.abrupt("break", 24);

        case 14:
          _context3.next = 16;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: id
            }
          }, {
            deleted: 'true',
            deletedAt: new Date()
          }));

        case 16:
          req.flash("success", "\u0110\xE3 x\xF3a th\xE0nh c\xF4ng ".concat(id.length, " s\u1EA3n ph\u1EA9m"));
          return _context3.abrupt("break", 24);

        case 18:
          bulkOps = id.map(function (item) {
            var _item$split = item.split('-'),
                _item$split2 = _slicedToArray(_item$split, 2),
                id = _item$split2[0],
                position = _item$split2[1];

            return {
              updateOne: {
                filter: {
                  _id: id
                },
                update: {
                  $set: {
                    position: position
                  }
                }
              }
            };
          });
          _context3.next = 21;
          return regeneratorRuntime.awrap(Product.bulkWrite(bulkOps));

        case 21:
          req.flash("success", "\u0110\xE3 thay \u0111\u1ED5i v\u1ECB tr\xED th\xE0nh c\xF4ng ".concat(id.length, " s\u1EA3n ph\u1EA9m"));
          return _context3.abrupt("break", 24);

        case 23:
          return _context3.abrupt("break", 24);

        case 24:
          referer = req.get('Referer');
          res.redirect(referer);

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //[DELETE] admin/products/delete/:id


module.exports.deleteProduct = function _callee4(req, res) {
  var referer;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: req.params.id
          }, {
            deleted: true,
            deletedAt: new Date()
          }));

        case 2:
          req.flash("success", "\u0110\xE3 x\xF3a th\xE0nh c\xF4ng s\u1EA3n ph\u1EA9m");
          referer = req.get('Referer');
          res.redirect(referer);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //[GET] admin/products/create


module.exports.create = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render('admin/pages/products/create.pug');

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //[POST] admin/products/create


module.exports.postCreate = function _callee6(req, res) {
  var count, newProduct;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          req.body.price = parseInt(req.body.price);
          req.body.stock = parseInt(req.body.stock);
          req.body.discountPercentage = parseInt(req.body.discountPercentage);

          if (!(req.body.position == '')) {
            _context6.next = 10;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(Product.countDocuments());

        case 6:
          count = _context6.sent;
          req.body.position = count + 1;
          _context6.next = 11;
          break;

        case 10:
          req.body.position = parseInt(req.body.position);

        case 11:
          newProduct = new Product(req.body);
          _context6.next = 14;
          return regeneratorRuntime.awrap(newProduct.save());

        case 14:
          res.redirect('/admin/products');

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  });
};