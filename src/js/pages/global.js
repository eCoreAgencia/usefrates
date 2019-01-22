import { isMobile } from "../utils";

$(document).ready(() => {
	const headerFixed = () => {
		const distancePageTop = 100;
		const pageScroll =
			window.pageYOffset || document.documentElement.scrollTop;

		if (pageScroll >= distancePageTop) {
			$(".header").addClass("header--fixed");
			$("main").css('margin-top','200px');
		} else {
			$(".header").removeClass("header--fixed");
			$("main").css('margin-top','0px');
		}
	};

	console.log(isMobile.Android());

	$(window).scroll(() => {
		headerFixed();
	});

	// if (!isMobile.any()) {
	// 	headerFixed();

	// 	$(window).scroll(() => {
	// 		headerFixed();
	// 	});
	// }

	$(".newsletter__form").sendForm("NL");
	$(document).ready(function() {
		$("#header-form").searchform({ vtexStore: "usefrates" });
	});
});
