class Filter {
	constructor() {
		$(".helperComplement").remove();
		// FIRST LEVEL PART
		this.buttonOpenFilter = $(".filter-mobile__filter");
		this.filterInner = $(".filter-mobile__inner");
		// SECOND LEVEL PART
		this.buttonFilterOpenSelector = $(
			".filter-mobile .search-multiple-navigator h5"
		);
		this.clearFilter();
		this.events();
		this.createSelection();
	}
	events() {
		this.buttonOpenFilter.click(this.openFilterOptions.bind(this));
		this.buttonFilterOpenSelector.click(this.giveActualfilterClassname);
	}
	clearFilter() {
		$(".btnClear").on("click", function(e) {
			e.preventDefault();
			$("fieldset label.sr_selected").each(function() {
				$(this).trigger("click");
			});
		});
	}
	openFilterOptions() {
		this.buttonOpenFilter.toggleClass("arrow-change");
		this.filterInner.toggleClass("is-oppened");
	}

	createSelection() {
		$(".filter fieldset h5").each(function() {
			if (
				$(this)
					.next("div")
					.find("label")[0]
			) {
				const text = $(this).text();
				let label = $(this)
					.next("div")
					.html();
				const html = `
				<div class = "filter-mobile__menu">
					<h6 class="filter-mobile__title">${text}</h6>
					<div class="filter-mobile__options">${label}</div>
				</div>`;
				$(document)
					.find(".filter-mobile__menu")
					.append(html);
			}
		});

		$(".filter input[type='checkbox']").vtexSmartResearch();
	}

	giveActualfilterClassname() {
		$(".filter-mobile__menu").toggleClass("is-active");
	}
}

if ($("body").hasClass("catalog")) {
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
