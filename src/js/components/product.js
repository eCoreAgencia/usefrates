import {
	getProductWithVariations
} from '../modules/vtexRequest';
class Product {
	constructor() {
		const productId = $('#___rc-p-id').val();
		let self = this;
		const productWithVariations = getProductWithVariations(productId);
		productWithVariations.then(product => {
			if (product) {
				self.renderSkuSelectors(product);
			}
		})
	}

	renderSkuSelectors(product) {
		console.log(product);
	}
}

$(document).ready(() => {
	window.Product = new Product();
})
