module.exports.postCreate = (req, res, next) => {
	if(!req.body.title){
		req.flash("error", `Vui lòng nhập tiêu đề!`)
		const referer = req.get('Referer');
		res.redirect(referer);
		return;
	}
	next();
}