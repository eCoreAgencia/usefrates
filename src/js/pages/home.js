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

		const shelf__prev = `<button type='button' class='slick-prev shelf__button icon-arrow-right-long'></button>`;
		const shelf__next = `<button type='button' class='slick-next shelf__button icon-arrow-right-long'></button>`;

		$('.shelf__carousel--full ul').slick({
			arrows: true,
			slideToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			variableWidth: true,
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
