import requestHttp from './requestHttp';
import * as api from './endpoint';

export default class vtexRequest {

    getProductById(id){
        const product = [];
        const http = new requestHttp();
        const promise = http.get(api.vtexSeachProductByCategory(id))
                        .then(response => response.json())
                        .then(data => product.push(data))
        return product;
    }

    getCategoryTree(level){
        const http = new requestHttp();
        const promise = http.get(api.vtexCategoryTree(level))
                            .then(response => response.json())
        return promise;
    }

    getProductsByCategoryId(id){
        const http = new requestHttp();
        const promise = http.get(api.vtexSeachProductByCategory(id))
                        .then(response => response.json())
        return promise;
    }
}
