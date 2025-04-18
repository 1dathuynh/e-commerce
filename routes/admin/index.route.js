const dashboardRoute = require('./dashboad.route')
const productsRoute = require('./products.route')
const path = require('../../config/system')
module.exports = (app) => {
	app.use(`${path.ADMIN}/dashboard`, dashboardRoute)
	app.use(`${path.ADMIN}/products`, productsRoute)
}