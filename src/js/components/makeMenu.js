import vtexRequest from '../modules/vtexRequest';

class MakeMenu {
	constructor(){
		this.categoryTree = [];
		this.getCategories();
	}

	getCategories(){
		let self = this;
		const api = new vtexRequest();
		const categories = [];
		api.getCategoryTree(2)
			.then(data => self.displayMenu(data));
	}

	displayMenu(categories){
		let self = this;			
		const html = categories.map(category => {
				return `
					<div class="navbar-item ${category.children.length > 0 ? ' has-dropdown': ''} is-hoverable">
						<a href="${category.url}" class="navbar-link">${category.name}</a>
						${category.children.length > 0 ? self.displaySubMenu(category.children): ''}
					</div>
				`;
			}).join('');
		$('.header__menu .navbar').html(html);
		$('.header__menu .navbar').addClass('js-make-menu');
	}

	displaySubMenu(children){
		
		const html = `
				<div class="navbar-dropdown">
					<div class="navbar-dropdown-items">
						${ children.map((category, i) => {
							return `
									${ (i % 10 == 0) ? '<div class="navbar-dropdown-column">' : ''	}
										<a href="${category.url}" class="navbar-item ${i}">
											${category.name}
										</a>
									${(i == children.length -1 || (i + 1) % 10 == 0) ? '</div>': ''}
								`;
							}).join('')
						}
					</div>
					<div class="navbar-dropdown-image">
						<img src="http://via.placeholder.com/400x289" />
					</div>	
				</div>`

		return html;
	}

	getBannerPlaceholder(){

	}

}



$(document).ready(function(){
	window.menu = new MakeMenu();	
})

