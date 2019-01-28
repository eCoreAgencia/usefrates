$(document).ready(() => {
	$(".header__lupa-mobile").on("click", function(e) {
		e.preventDefault();
		$(".header__wrapper").toggleClass("search-active");
	});

	$(".header__menu-icon").on("click", function(e) {
		e.preventDefault();
		$(".header").toggleClass("menu-active");
		$("body").toggleClass("menu-active");
	});

	$(".menu__link").on("click", function(e) {
		e.preventDefault();
		let submenu = $(this).parent().find(".menu__dropdown");
		if (submenu.length) {
			$(this).parent()
				.toggleClass("dropdown-active")
				.find(".menu__link")
				.toggleClass("is-clicked");
			$(this).parent().hasClass("dropdown-active")
				? submenu.fadeIn()
				: submenu.fadeOut();
		}
	});
	$("main").on("click", function(e) {
		$(".search-form__result").css("display", "none");
	});
});
