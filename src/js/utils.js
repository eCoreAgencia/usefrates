export let isLocalhost = ~window.location.host.indexOf('localhost') ? true : false;
export let vtexSearchPageEndpoint = (query, shelfId, ps) => `/buscapagina?&ft=${query}&PS=${ps}&sl=${shelfId}&cc=50&sm=0&PageNumber=1`;
