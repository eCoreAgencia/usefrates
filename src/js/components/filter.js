class Filter {
	constructor() {
		$('.helperComplement').remove();
		this.h5 = $('.search-multiple-navigator fieldset h5');
		this.renderListNamesData();
		this.clearFilter();
		this.buttonFilter = $('.filter-mobile__item');
		this.closeButtonFilter = $('#close-filter');
		this.events();
		this.closeFilter();
		let self = this;
	}
	events() {
		let self = this;
		this.buttonFilter.on('click', function() {
			self.toggleTheFilterOptions(this);
		});

	}

	renderListNamesData() {
		$(this.h5).each((index, name) => {
			let elementToReceiveHtml = $('.filter-mobile__list');
			let nome = $(name).text();
			elementToReceiveHtml.append(
				$('<li>', { class: 'filter-mobile__item' })
					.attr('data-name', nome)
					.text(nome)
			);
		});
	}
	closeFilter() {
		$('.filter-mobile__absolute').removeClass('active');
	}
	toggleTheFilterOptions(e) {
		let itemData = $(e).attr('data-name');
		let element = $(`.filtro_${itemData.toLowerCase()}`).html();
		let absoluteDiv = $('.filter-mobile__absolute');
		absoluteDiv.html(element);
		absoluteDiv.toggleClass('active');
		this.closeButton();
	}

	closeButton() {
		let buttonToCloseFilter = `<span onClick="filter.closeFilter()" id="close-filter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg></span>`;
		let filterBox = $('.filter-mobile__absolute');
		filterBox.find('h5').append(buttonToCloseFilter);
	}

	clearFilter() {
		$('.btnClear, #close-filter').on('click', function(e) {
			e.preventDefault();
			$('fieldset label.sr_selected').each(function() {
				$(this).trigger('click');
			});
		});
	}
}

if ($('body').hasClass('catalog')) {
	window.filter = new Filter();
}
