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


