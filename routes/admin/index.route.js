const dashboardRoute = require('./dashboad.route')
const productsRoute = require('./products.route')
const productsCategoryRoute = require('./products-category.route')
const path = require('../../config/system')
module.exports = (app) => {
	app.use(`${path.ADMIN}/dashboard`, dashboardRoute)
	app.use(`${path.ADMIN}/products`, productsRoute)
	app.use(`${path.ADMIN}/products-category`, productsCategoryRoute)

}