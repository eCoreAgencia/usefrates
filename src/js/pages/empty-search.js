$(document).ready(function() {
	if ($('body').hasClass('empty-search')) {
		var word = decodeURI(window.location.search);
		word = word.replace('?ft=', '');
		console.log(word);
		$('.box-emptySearch p span em').text(word);

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
	}
});
