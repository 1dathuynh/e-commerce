tinymce.init({
	selector: 'textarea.tiny-mce',
	plugins: 'advlist link image lists',
  toolbar: 'undo redo | bold italic',
  menubar: true,
	file_picker_callback: function (callback, value, meta) {
    if (meta.filetype == 'image') {
        var input = document.querySelector('.image-mce');
        input.click();
        input.onchange = function () {
            var file = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                callback(e.target.result, {
                    alt: file.name
                });
            };
            reader.readAsDataURL(file);
        };
    }
}
});

	console.log("hello tinymce");
	