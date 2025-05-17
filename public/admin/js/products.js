const buttonChangeStatus = document.querySelectorAll('[button-change-status]')
const formChangeStatuts = document.getElementById('form-change-status')
if (formChangeStatuts) {
	buttonChangeStatus.forEach((item) => {
		item.addEventListener('click', () => {
			const id = item.getAttribute('data-id')
			const status = item.getAttribute('data-status')
			let statusChange = status === 'active' ? 'inactive' : 'active'
			let datapaths = formChangeStatuts.getAttribute('data-path')
			const action = datapaths + `/${statusChange}/${id}?_method=PATCH`
			formChangeStatuts.action = action
			formChangeStatuts.submit()

		})

	})
}


// CheckBox Multi
const checkboxMulti = document.querySelector("[check-box-multi]")
if (checkboxMulti) {
	const inputAll = document.querySelector("input[name=checkall]")
	const inputIds = document.querySelectorAll("input[name=id]")
	inputAll.addEventListener('click', () => {
		if (inputAll.checked) {
			inputIds.forEach((input) => {
				input.checked = true;
			})
		} else {
			inputIds.forEach((input) => {
				input.checked = false;
			})
		}
	})

	inputIds.forEach((input) => {
		input.addEventListener('click', () => {
			const countChecked = document.querySelectorAll("input[name=id]:checked").length;
			const countInput = inputIds.length;
			if (countChecked == countInput) {
				inputAll.checked = true;
			} else {
				inputAll.checked = false;
			}
		})
	})


}
//End CheckBox Multi

//FormChangeMulti
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
	formChangeMulti.addEventListener("submit", (e) => {
		e.preventDefault();
		const inputChecked = document.querySelectorAll("input[name='id']:checked");
		const inputIds = document.querySelector("input[name='ids']");
		const typeChange = e.target.elements.type.value
		if (typeChange == "delete-all") {
			if (!confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn?")) {
				return;
			}
		}
		if (inputChecked.length > 0) {
			let ids = [];
			inputChecked.forEach(item => {
				if (typeChange == "change-position") {
					const position = item.closest('tr').querySelector("input[name='position']").value
					ids.push(`${item.value}-${position}`)
				}
				else {
					ids.push(item.value)
				}
				inputIds.value = ids.join(", ")
				formChangeMulti.submit();
			})
		}
		else {
			alert("Vui lòng chọn ít nhất 1 bản ghi")
		}

	})
}

//End FormChangeMulti

//delete Products
const deleteButton = document.querySelectorAll("[button-delete]")
const formDelete = document.querySelector("#form-delete")
if(formDelete) {
	const path = formDelete.getAttribute("data-path")
	deleteButton.forEach(item => {
		if (deleteButton) {
			item.addEventListener("click", (e) => {
				if (confirm("Bạn có chắc chắn muốn xóa")) {
					formDelete.action = `${path}/${item.getAttribute("data-id")}?_method=DELETE`
					formDelete.submit();
				} else {
					return;
				}

			})
		}

	})
}
//End delete Products


// Preview Image Create Product
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
	const uploadImageInput = document.querySelector("[upload-image-input]")
	const uploadImagePreview = document.querySelector("[upload-image-preview]")
	uploadImageInput.addEventListener("change", (e) => {
		console.log(e);

		const file = e.target.files[0]
		if (file) {
			uploadImagePreview.src = URL.createObjectURL(file)
		}

	})
}

// End Preview Image Create Product
//  Delete Preview Image Create

//  End  Delete Preview Image Create

// Delete Preview Image Upadte
const removeImagePreview = document.querySelector("#remove-img-preview")
if (removeImagePreview) {
	removeImagePreview.addEventListener("click", () => {
		const uploadImagePreview = document.querySelector("[upload-image-preview]")
		const uploadImageInput = document.querySelector("[upload-image-input]")

		uploadImagePreview.src = "";
		uploadImageInput.value = "";
		removeImagePreview.classList.add("remove-image-preview-hidden")
	})
}
// End Delete Preview Image Upadte



// Sort product
	const sort = document.querySelector("[sort]")
	
	if(sort){
		const sortSelect = sort.querySelector("[sort-select]")
		const sortClear = document.querySelector('[sortClear]')
		const url = new URL(window.location.href);
		sortSelect.addEventListener("change", (e) => {
			let name = e.target.name
			let value = e.target.value
			value = value.split('-')
			url.searchParams.set('sortKey', value[0]);
			url.searchParams.set('sortValue', value[1]);
			 window.history.pushState({}, '', url.href);
			 const options = e.target.querySelectorAll('option');
        options.forEach(option => {
            option.removeAttribute('selected');  // Loại bỏ selected từ tất cả các option
        });

        const selectedOption = e.target.selectedOptions[0];
        selectedOption.setAttribute('selected', 'selected'); 
		})
		sortClear.addEventListener("click", () => {
			url.searchParams.delete('sortKey');
      url.searchParams.delete('sortValue');
			window.location.href = url.href;	
			
		})
		// selected 
		const sortKey = url.searchParams.get('sortKey');
		const sortValue = url.searchParams.get('sortValue');
		if(sortKey && sortValue){
			const value = `${sortKey}-${sortValue}`
			const options = sortSelect.querySelectorAll("option")
			options.forEach(item => {
				if(item.value === value){
					item.selected = true
				}
			})
		}
	}

// End Sort product