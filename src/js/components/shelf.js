import { addToCart } from '../utils';

export const productShelf = (shelf, list = false) => {
	console.log(shelf);
	let product_shelf =  `<div class="product product--shelf"><span class="product__id" data-product-id="225047"></span>
	<div class="product__header">
	  <div class="product__media"><a class="product__link" href="/produto.html" tabindex="-1"><img src="${shelf.items[0].images[0].imageUrl}" width="279" height="365"></a></div>
	  <div class="product__actions"><a class="button product__link" title="Nome do produto" href="/produto.html" tabindex="-1">Ver Produto</a><a class="button product__buy" href="/produto.html" data-product-id="225047" tabindex="-1">Compre Rápido</a></div>
	</div>
	<div class="product__reviews"></div>
	<div class="product__info">
	  <h3 class="product__name"><a class="product__link" title="${shelf.productName}" href="/produto.html" tabindex="-1">${shelf.productName}</a></h3>
	  <div class="product__price">
		<div class="price"><span class="price__list">R$ 5,99 no boleto</span><span class="price__instament">12x R$ 13,24 sem juros</span></div>
	  </div>
	</div>
	<div class="product__category"><a class="button" href="/category.html" tabindex="-1">+ Iluminação</a></div>
  </div>`;
  if(list) product_shelf = `<li>${product_shelf}</li>`
  return product_shelf;
}

$(document).ready(function(){
	$('.product--shelf .product__buy').on('click', function(e){
		e.preventDefault();
		const productID = $(this).data('product-id');
		addToCart(productID);
	})
});
