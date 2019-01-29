$('document').ready(function () {
	if ($('body').hasClass("institutional")) {
		let url = window.location.pathname
		let linkPath = $('.institutional__link');

		linkPath.each(function () {
			let href = $(this).attr("href");
			if (href == url) {
				$(this).css("color", "#80754e")
			}
		})

	}

})
