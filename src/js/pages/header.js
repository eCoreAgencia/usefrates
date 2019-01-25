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

	$(".menu__item").on("click", function(e) {
		e.preventDefault();
		let submenu = $(this).find(".menu__dropdown");
		if (submenu.length) {
			$(this)
				.toggleClass("dropdown-active")
				.find(".menu__link")
				.toggleClass("is-clicked");
			$(this).hasClass("dropdown-active")
				? submenu.fadeIn()
				: submenu.fadeOut();
		}
	});
	$("main").on("click", function(e) {
		$(".search-form__result").css("display", "none");
	});
});
