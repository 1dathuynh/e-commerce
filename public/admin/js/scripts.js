const buttonStatus = document.querySelectorAll('[button-status]');
if(buttonStatus.length > 0){
	buttonStatus.forEach((button) => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const status = button.getAttribute('button-status');			
			let params = new URLSearchParams(window.location.search);
			if(status == ''){
				params.delete('status');
			}
			else{
				params.set('status', status);
			}
			
			// window.history.pushState({}, '', '?' + params.toString());
			// cập nhật lại params trong url nhưng không load lại trang
			 window.location.href = window.location.pathname + (params.toString() ? `?` + params.toString() : "");			
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


