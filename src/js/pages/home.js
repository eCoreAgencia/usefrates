$(document).ready(function() {
	if ($('body').hasClass('home')) {
		$('.forms-b2b').appendTo('.modaleCore__middle');
		$('.product__cadastre').on('click', function(event) {
			$('.modaleCore').addClass('active');
		});

		if ($('.call__box')[0]) {
			$('.call__box').each(function() {
				const img = $('img', this).attr('src');

				$(this).css('background-image', 'url(' + img + ')');
			});
		}

		$('.product--shelf-flip .product__front').on('click', function() {
			$(this)
				.parents('.product--shelf-flip')
				.addClass('hover');
		});

		var $gallery = $('.banner--full .banner__inner , .banner--mobile .banner__inner');

		$gallery.slick({
			dots: true,
			autoplay: true,
			arrows: false,
			fade: true,
			infinite: false
		});

		const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
		const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;

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

		$(window).on('productFinished', function() {
			console.log('productFinished');
			$('.buy-by-category .shelf ul').each(function() {
				if ($('li.helperComplement', this)[0]) {
					$('li.helperComplement', this).remove();
				}
				if ($('li', this).length > 5 && !$(this).hasClass('slick-initialized')) {
					$(this).slick({
						arrows: true,
						slideToShow: 3,
						slidesToScroll: 1,
						infinite: true,
						variableWidth: true,
						prevArrow: shelf__prev,
						nextArrow: shelf__next
					});
				}
			});
		});
	}
});
