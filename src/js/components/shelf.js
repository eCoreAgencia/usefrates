import { addToCart } from '../utils';

export const productShelf = (shelf) => {
	return ``;
}

$(document).ready(function(){
	$('.product--shelf .product__buy').on('click', function(e){
		e.preventDefault();
		const productID = $(this).data('product-id');
		addToCart(productID);
	})
});
