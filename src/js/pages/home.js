$(document).ready(function() {
	const mob__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,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"/></g></g></svg></button>`;
	const mob__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,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"/></g></g></svg></button>`;
	const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
	const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
	if ($("body").hasClass("home")) {
		var $gallery = $(".banner--full .banner__inner");
		var $galleryMob = $(".banner--mobile .banner__inner");
		const banner__prev = `<button type='button' class='slick-prev banner__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="31" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#ffffff" xlink:href="#j4iva"/></g></g></svg></button>`;
		const banner__next = `<button type='button' class='slick-next banner__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="31" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#ffffff" xlink:href="#j4iva"/></g></g></svg></button>`;
		const progressBar = $(".progress");
		var slideCount = null;

		$gallery.on("init", function(event, slick) {
			slideCount = slick.slideCount;
			console.log(slideCount);
			setSlideCount();
			setCurrentSlideNumber(slick.currentSlide);
		});

		$gallery.on("beforeChange", function(
			event,
			slick,
			currentSlide,
			nextSlide
		) {
			setCurrentSlideNumber(nextSlide);
			var calc = (nextSlide / (slick.slideCount - 1)) * 100;
			progressBar
				.css("background-size", calc + "% 100%")
				.attr("aria-valuenow", calc);
		});

		function setSlideCount() {
			var $el = $(".slide-count-wrap").find(".total");
			$el.text(function(i, n) {
				var result = Number(n) + 1;
				if (result < 10) {
					return "0" + slideCount;
				} else {
					return result;
				}
			});
		}

		function setCurrentSlideNumber(currentSlide) {
			var $el = $(".slide-count-wrap").find(".current");
			var n = currentSlide + 1;
			$el.text(function(i, n) {
				var result = currentSlide + 1;
				if (result < 10) {
					return "0" + result;
				} else {
					return result;
				}
			});
		}

		$gallery.slick({
			dots: false,
			autoplay: true,
			arrows: true,
			fade: true,
			infinite: false,
			prevArrow: banner__prev,
			nextArrow: banner__next
		});
		$galleryMob.slick({
			dots: true,
			autoplay: true,
			arrows: true,
			fade: true,
			infinite: false,
			prevArrow: banner__prev,
			nextArrow: banner__next
		});

		$(".shelf__carousel--full ul").slick({
			dots: false,
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			prevArrow: shelf__prev,
			nextArrow: shelf__next,
			responsive: [
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
						prevArrow: mob__prev,
						nextArrow: mob__next,
						dots: true
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						prevArrow: mob__prev,
						nextArrow: mob__next,
						dots: true
					}
				}
			]
		});
	}
});
