let count = 0
const createTree = (record, parentId = "") => {
		const tree = [];
		record.forEach(item => {
			if(item.parent_id === parentId){
				count++;
				const newItem = item;
				newItem.index = count;
				const child = createTree(record, item._id.toString())
				if(child.length > 0){
					newItem.child = child;
				}
				tree.push(newItem)
			}
		})
		return tree
	}
module.exports.treeCategory = (record) => {
	count = 0;
	const tree = createTree(record)
	return tree;
}