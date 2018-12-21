// class Catalog {
// 	constructor() {
// 		let filterNames = [];
// 		this.chds = [];
// 		this.filterBox = $(".filter-mobile__absolute-list");
// 		this.getFilters();
// 		this.renderFilters();
// 		this.events();
// 	}
// 	events() {
// 		this.buttonFilter.click(this.toggleTheFilterOptions.bind(this));
// 	}

// 	toggleTheFilterOptions() {
// 		this.filterBox.fadeToggle();
// 	}

// 	// FIRST CHECK IF BODY HAS CLASS TO APPLY JS
// 	checkBody() {
// 		if ($("body").hasClass("catalog") && $(window).width <= 800) {
// 			this.getFilters();
// 			this.renderFilters();
// 		} else {
// 			return false;
// 		}
// 	}
// 	// GET FILTERNAMES AND CONTENT AND PUT IN THE ARRAY
// 	getFilters() {
// 		let names = [];
// 		let chds = [];
// 		$(".search-multiple-navigator h5").each(function(
// 			index,
// 			filterName,
// 			childBox
// 		) {
// 			childBox = $(this)
// 				.parent()
// 				.find("div");
// 			let x = $(filterName);
// 			let y = $(childBox);
// 			names.push(x.text());
// 			chds.push(y);
// 			console.log(names, chds);
// 		});
// 		return (this.filterNames = names), (this.chds = chds);
// 	}

// 	// RENDER THE NAMES IN A NEW ELEMENT FOR MOBILE
// 	renderFilters() {
// 		let fn = this.filterNames;
// 		let chd = this.chds;

// 		let elementToReceiveHtml = $(".filter-mobile__absolute-list");
// 		elementToReceiveHtml.append(
// 			fn.map((name, index) =>
// 				$("<li>", { class: "filter-mobile__item" }).append(
// 					$("<a>", { class: "filter-mobile__link" }).text(name),
// 					$("<ul>", { class: "filter-mobile__selection" }).append(
// 						chd[index]
// 					)
// 				)
// 			)
// 		);
// 	}
// }

// window.catalog = new Catalog();
