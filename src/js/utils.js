export let isLocalhost = ~window.location.host.indexOf('localhost') ? true : false;
export const categoryTreeEndpoint = (level) => `/api/catalog_system/pub/category/tree/${level}`;


export const addToCart = function(id, quantity = 1, seller = '1', redirect = false) {
	let item = { id, quantity, seller }
	vtexjs.checkout.addToCart([item], null, 1)
	  .done(orderForm => {
	    console.log(orderForm);
	  })
}
