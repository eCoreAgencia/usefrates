import { isMobile } from "../utils";

$(document).ready(() => {
	const headerFixed = () => {
        let distancePageTop = 45;
        if ($(window).width() <= 799) {
            distancePageTop = 113 ;
            $("main").css("padding-top", "113px")

        }
		const pageScroll =
			window.pageYOffset || document.documentElement.scrollTop;

		if (pageScroll >= distancePageTop) {
			$(".header").addClass("header--fixed");
            $("main").css('padding-top', `${distancePageTop}'px'`);
            
		} else {
			$(".header").removeClass("header--fixed");
			$("main").css('padding-top','0px');
        }
       
	};

	console.log(isMobile.Android());

	$(window).scroll(() => {
		headerFixed();
	});


	
    $(".tipbar__mobile-list").slick({
        dots: false,
        // autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        arrows: false,
    });

	$(".newsletter__form").sendForm("NL");
	$(document).ready(function() {
		$("#header-form").searchform({ vtexStore: "usefrates" });
	});
});
