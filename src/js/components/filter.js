class Filter {
	constructor() {
		$('.helperComplement').remove();
		this.h5 = $('.search-multiple-navigator fieldset h5');
		this.renderListNamesData();
		this.clearFilter();
		this.buttonFilter = $('.filter-mobile__item');
		this.events();
		let self = this;
	}
	events() {
		this.buttonFilter.click(this.toggleTheFilterOptions);
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

	toggleTheFilterOptions() {
		console.log(this);
		let itemData = $(this).attr('data-name');
		console.log(itemData);
		let element = $(document).find($(`.filtro_${itemData.toLowerCase()}`));
		console.log(element);
		let absoluteDiv = $('.filter-mobile__absolute');
		absoluteDiv.html(element);
	}

	clearFilter() {
		$('.btnClear').on('click', function(e) {
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

// $(this);
// if (
// 	$(this)
// 		.next("div")
// 		.find("label")[0]
// ) {
// 	const text = $(this).text();
// 	let label = $(this)
// 		.next("div")
// 		.html();
// 	const html = `
// 		<ul class="filter-mobile__list">
// 			<li class="filter-mobile__item"><span>${text}</span><li>
// 			  <div class="filter-mobile__options">
// 				${label}
// 			  </div>
// 			</li>
// 		</ul>`;
// 	$(document)
// 		.find(".filter-mobile__menu")
// 		.append(html);
// }
// $(".filter-mobile input[type='checkbox']").vtexSmartResearch();
