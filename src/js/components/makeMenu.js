import axios from 'axios';
import { isLocalhost, vtexcategoryTreeEndpoint } from '../utils';

class MakeMenu {
	constructor(){
		this.categoryTree = [];
		this.getCategoryTree();
	}

	getCategoryTree(){
		let self = this;
		const endpoint = isLocalhost ? `/json/categoryTree.json` : vtexcategoryTreeEndpoint(2);
		axios.get(endpoint)
		.then((data) => {

					self.categoryTree.push(...data.data);
					$(window).trigger('categoryTreeUpdated');

				})
		.catch(error => console.log(error))
	}

	displayMenu(){
		let self = this;
		const categories = this.categoryTree;
		const html = categories.map(category => {
			return `
				<div class="navbar-item ${category.children.length > 0 ? ' has-dropdown': ''} is-hoverable">
					<a href="${category.url}" class="navbar-link">${category.name}</a>
					${category.children.length > 0 ? self.displaySubMenu(category.children): ''}
				</div>
			`;
		}).join('');
		console.log(categories);

		$('.header__menu .navbar').html(html);
		$('.header__menu .navbar').addClass('js-make-menu');
	}

	displaySubMenu(children){
		
		const html = `
		<div class="navbar-dropdown">
			<div class="navbar-dropdown-items">
				${ children.map((category, i) => {
						if(i % 10 == 0){ console.log(children.length, 'inicio', i)}
						if(i == children.length - 1){ console.log(children.length, 'final', i)}
						
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

}



$(document).ready(function(){
	window.menu = new MakeMenu();
	$(window).on('categoryTreeUpdated', function(){
		menu.displayMenu();
	})
})

