$(document).ready(function() {
	if ($('body').hasClass('home')) {
		var $gallery = $('.banner--full .banner__inner');
		const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
		const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
		const banner__prev = `<button type='button' class='slick-prev banner__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="31" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#ffffff" xlink:href="#j4iva"/></g></g></svg></button>`;
		const banner__next = `<button type='button' class='slick-next banner__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="31" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#ffffff" xlink:href="#j4iva"/></g></g></svg></button>`;
		const progressBar = $('.progress');
		var slideCount = null;

		$gallery.on('init', function(event, slick) {
			slideCount = slick.slideCount;

			console.log(slideCount);
			setSlideCount();
			setCurrentSlideNumber(slick.currentSlide);
		});

		$gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			setCurrentSlideNumber(nextSlide);
			var calc = (nextSlide / (slick.slideCount - 1)) * 100;
			progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
		});

		function setSlideCount() {
			var $el = $('.slide-count-wrap').find('.total');
			$el.text(function(i, n) {
				var result = Number(n) + 1;
				if (result < 10) {
					return '0' + slideCount;
				} else {
					return result;
				}
			});
		}

		function setCurrentSlideNumber(currentSlide) {
			var $el = $('.slide-count-wrap').find('.current');
			var n = currentSlide + 1;
			$el.text(function(i, n) {
				var result = currentSlide + 1;
				if (result < 10) {
					return '0' + result;
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

		$('.shelf__carousel--full ul').slick({
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			prevArrow: shelf__prev,
			nextArrow: shelf__next,
			responsive: [
				{
					breakpoint: 800,
					settings: 'unslick'
				}
			]
		});
	}
});
