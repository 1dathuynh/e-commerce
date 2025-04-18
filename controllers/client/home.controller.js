// [GET] /
module.exports.index =  (req, res) => {
	res.render('client/pages/home/index', {
		pageTitle: 'Home Page',
	});
}
module.exports.homes =  (req, res) => {
	res.render('client/pages/products/index')
}