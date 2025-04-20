module.exports = (objectPagination, query, countProduct) => {
	if(query.page){
		objectPagination.curentPage = parseInt(query.page)
	}
	objectPagination.skipPage = (objectPagination.curentPage - 1) * objectPagination.limitPage;
		
	objectPagination.totalPage = Math.ceil(countProduct / objectPagination.limitPage);
	return objectPagination;
}