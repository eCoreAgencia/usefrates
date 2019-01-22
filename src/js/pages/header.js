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

	$(".menu__link-arrow").on("click", function(e) {
		// e.preventDefault();
		let submenu = $(this).parents("li").find(".menu__dropdown");
		if (submenu.length) {
			$(this).parents("li")
				.toggleClass("dropdown-active")
				.find(".menu__link")
				.toggleClass("is-clicked");
			$(this).parents("li").hasClass("dropdown-active")
				? submenu.fadeIn()
				: submenu.fadeOut();
		}
	});
	$("main").on("click", function(e) {
		$(".search-form__result").css("display", "none");
	});
});
