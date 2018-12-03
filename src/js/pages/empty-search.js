$(document).ready(() => {
	if ($('body').hasClass('empty-search')) {
		let word = decodeURI(window.location.search);
		word = word.replace('?ft=', '');
		$('.empty-search__term-result').text(word);
	}
});

$(document).ready(() => {
	if ($('body').hasClass('empty-search')) {
		if ($('li.helperComplement')[0]) {
			$('li.helperComplement').remove();
		}

		$('.shelf__carousel--full ul').slick({
			dots: false,
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			prevArrow: shelf__prev,
			nextArrow: shelf__next,
			responsive: [
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						prevArrow: mob__prev,
						nextArrow: mob__next,
						dots: true
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						prevArrow: mob__prev,
						nextArrow: mob__next,
						dots: true
					}
				}
			]
		});
	}
});
