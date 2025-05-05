// bo loc 
const buttonStatus = document.querySelectorAll('[button-status]');
if(buttonStatus.length > 0){
	buttonStatus.forEach((button) => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const status = button.getAttribute('button-status');			
			const url = new URL(window.location.href);
			if(status){
				url.searchParams.set('status', status);
			}
			else{
				url.searchParams.delete('status');
			}
			window.location.href = url.href;	
		})
		
	})
}


//Tìm kiếm 
const searchInput = document.querySelector('#form-search')
if(searchInput){
	let url = new URL(window.location.href);
	searchInput.addEventListener('submit', (e) => {
		e.preventDefault();
		const keyword = e.target.elements.keyword.value;
		if(keyword){
			url.searchParams.set('keyword', keyword);
		}else{
			url.searchParams.delete('keyword');
		}
		window.location.href = url.href;
	})
}

// End tìm kiếm



//pagination
const pagination = document.querySelectorAll('[buttonPagination]')
pagination.forEach((item) => {
	const url = new URL(window.location.href);
	item.addEventListener('click', () => {
		const page = item.getAttribute('buttonPagination');
		if(page){
			url.searchParams.set('page', page);
		}else{
			url.searchParams.delete('page');
		}
		window.location.href = url.href;
	})
	
})


//Show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
	const time = parseInt(showAlert.getAttribute("data-time"))
	setTimeout(() => {
		showAlert.classList.add("alert-hidden") 
	}, time)
	const closeAlert = showAlert.querySelector("[close-alert]")
	closeAlert.addEventListener("click", () => {
		showAlert.classList.add("alert-hidden") 
	})
	
}

//end Show alert
