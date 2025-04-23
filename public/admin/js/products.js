
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
	const inputIds = document.querySelector("input[name='ids']")
	if(inputChecked.length > 0){
		 let ids = [];
		 inputChecked.forEach(item => {
			ids.push(item.value)
			inputIds.value = ids.join(", ")
			formChangeMulti.submit();
		 })
	}
	else{
		alert("Vui lòng chọn ít nhất 1 bản ghi")
	}
	
})

//End FormChangeMulti