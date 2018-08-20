import axios from 'axios';


export default class SearchForm {
    constructor(element){
      let self = this;
      this.form = $(element);
      $(element).find('.input').on('keyup', function(){
        const word = $(this).val();
        if(word > 3) self.getSearch(word)
      })
      this.init();
    }

    listHtml(element){
      const list = `<ul class="search-form__result-list"></ul>`;
      element.append(list);
    }

    isLocalhost(){
      return ((window.location.hostname === 'localhost') || (~window.location.hostname.indexOf('192.168'))) ? true : false
    }
    init(){
      this.listHtml(this.form);
    }


    renderResultList(items){
      if(!items) return 'Sem resultados';
      const list = this.form.find('.search-form__result-list');
      list.show();
      items.forEach(item => {
       let { href, name, thumbUrl: thumb } = item
       let html = `
         <a class="RexSearchform-list-item" href="${href}" title="${name}">
           ${thumb ? `
             <div class="RexSearchform-list-item__img">
               <img src="${thumb}" alt="${name}"/>
             </div>
           ` : ''}
           <span class="RexSearchform-list-item__name">${name}</span>
         </a>
       `
       list.append(html)
     })

      console.log(items);

    }

    getSearch(query){
      let self = this;
      const endpoint = this.isLocalhost() ? `/json/result.json` : `https://casaegaragem.vtexcommercestable.com.br/buscaautocomplete/?productNameContains=${query}`;
      axios.get(endpoint)
        .then(response => self.renderResultList(eval(response.data)))
        .catch(error => console.log(error))
    }


}

window.searchForm = new SearchForm('#header-form');


