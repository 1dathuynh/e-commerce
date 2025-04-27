
const buttonChangeStatus = document.querySelectorAll('[button-change-status]')
const formChangeStatuts = document.querySelector('#form-change-status')

const datapaths = formChangeStatuts.getAttribute('data-path')

	
buttonChangeStatus.forEach((item) => {
	item.addEventListener('click', () => {
		const id = item.getAttribute('data-id')
		const status = item.getAttribute('data-status')
		let statusChange = status === 'active' ? 'inactive' : 'active'
		const action = datapaths + `/${statusChange}/${id}?_method=PATCH` 
		formChangeStatuts.action = action
		formChangeStatuts.submit()
		
	})
	
})


// CheckBox Multi
const checkboxMulti = document.querySelector("[check-box-multi]")
if(checkboxMulti){
	const inputAll = document.querySelector("input[name=checkall]") 
	const inputIds = document.querySelectorAll("input[name=id]")
	inputAll.addEventListener('click', () =>{
		if(inputAll.checked){
			inputIds.forEach((input) => {
				input.checked = true;
			})
		}else{
			inputIds.forEach((input) => {
				input.checked = false;
			})
		}
	})

	inputIds.forEach((input) => {
		input.addEventListener('click', () => {
			const countChecked = document.querySelectorAll("input[name=id]:checked").length;
			const countInput = inputIds.length;
			if(countChecked == countInput){
				inputAll.checked = true;
			}else{
				inputAll.checked = false;
			}
		})
	})
	
	
}
//End CheckBox Multi

//FormChangeMulti
const formChangeMulti = document.querySelector("[form-change-multi]")
formChangeMulti.addEventListener("submit", (e) => {
	e.preventDefault();
	const inputChecked = document.querySelectorAll("input[name='id']:checked");
	const inputIds = document.querySelector("input[name='ids']");
	const typeChange = e.target.elements.type.value
	if(typeChange == "delete-all"){
		if(!confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn?")){
			return;
		}
	}
	if(inputChecked.length > 0){
		 let ids = [];
		 inputChecked.forEach(item => {
			if(typeChange == "change-position"){
				const position = item.closest('tr').querySelector("input[name='position']").value
				ids.push(`${item.value}-${position}`)
			}
			else{
				ids.push(item.value)
			}
			inputIds.value = ids.join(", ")
			formChangeMulti.submit();
		 })
	}
	else{
		alert("Vui lòng chọn ít nhất 1 bản ghi")
	}
	
})

//End FormChangeMulti

//delete Products
const deleteButton = document.querySelectorAll("[button-delete]")
const formDelete = document.querySelector("#form-delete")
const path = formDelete.getAttribute("data-path")

deleteButton.forEach(item => {
	if(deleteButton){
		item.addEventListener("click", (e) => {
			if(confirm("Bạn có chắc chắn muốn xóa")){
				formDelete.action = `${path}/${item.getAttribute("data-id")}?_method=DELETE`
				formDelete.submit();
			}else{
				return;
			}
			
		})
	}
	
})
//End delete Products
