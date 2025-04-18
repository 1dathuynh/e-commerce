const routerProduct = require('./products.route');
const routerHome = require('./home.route');
module.exports = (app) => {
	app.use('/', routerHome)
	
	app.use('/products', routerProduct)
}