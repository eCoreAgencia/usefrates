class Catalog {
	constructor() {
		this.checkBody();
		this.getFilters();
		this.renderFilters();
		this.events();
		let filterNames = [];
		this.buttonFilter = $(".filter-mobile__filter");
	}
	events() {
		this.buttonFilter.click(this.toggleTheFilterOptions.bind(this));
	}
	toggleTheFilterOptions() {
		console.log(this);
	}
	checkBody() {
		if ($("body").hasClass("catalog") && $(window).width <= 800) {
			this.getFilters();
			this.renderFilters();
		} else {
			return null;
		}
	}
	getFilters() {
		let names = [];
		$(".search-multiple-navigator h5").each(function(index, filterName) {
			let x = $(filterName).text();
			names.push(x);
		});
		return (this.filterNames = names);
	}
	renderFilters() {
		let fn = this.filterNames;
		let elementToReceiveHtml = $(".filter-mobile__absolute-list");
		elementToReceiveHtml.append(
			fn.map(name =>
				$("<li>", { class: "filter-mobile__item" }).append(
					$("<a>", { class: "filter-mobile__link" }).text(name)
				)
			)
		);
	}
}

window.catalog = new Catalog();
