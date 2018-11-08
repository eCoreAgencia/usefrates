import {
	getProductWithVariations
} from '../modules/vtexRequest';
import { isMobile } from '../utils';
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
    if($('body').hasClass('product')){
        window.Product = new Product();
        if(isMobile.any()){
            $('.thumbs').slick({
                arrows: false,
                dots: true
            });
        }    
    }
	
})
