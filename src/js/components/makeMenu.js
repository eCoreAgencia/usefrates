import axios from 'axios';
import { isLocalhost, categoryTreeEndpoint } from '../utils';

class MakeMenu {
	constructor(){
		this.categoryTree = [];
		this.getCategoryTree();
	}

	getCategoryTree(){
    let self = this;
    const endpoint = isLocalhost ? `/json/categoryTree.json` : categoryTreeEndpoint(2);
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
	}

	displaySubMenu(children){
		const html = `
		<div class="navbar-dropdown">
		${ children.map(category => {
				return `<a href="${category.url}" class="navbar-item">
				${category.name}
				</a>`;
			}).join('')
		}
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

