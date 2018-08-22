import axios from 'axios';
import { isLocalhost, vtexSearchPageEndpoint } from '../utils';

export default class SearchForm {

  constructor(element){
	  
	this.form = $(element);
	this.shelfId = 'ebccb84c-3bc2-590c-7999-9849b0cbd4d5';
	this.init()
  }

  init(){
	let self = this;
	const input = this.form.find('.input');
	this.listHtml(this.form)

	input.on('keyup focus', function(){
	  const list = $('.search-form__result-list');
	  const word = $(this).val();
	  console.log(word)
	  if(word.length >= 3) self.getSearchResult(word)
	})

	input.on('blur', function(){
	  const list = $('.search-form__result-list');
	  setTimeout(function(){
		list.hide();
		list.empty();
	  }, 500)

	})

  }

  listHtml(element){
	const resultWrapper = `<ul class="search-form__result-list"></ul>`;
	element.append(resultWrapper);
  }

  getSearchResult(query){
	let self = this;
	const endpoint = isLocalhost ? `/product.html` : vtexSearchPageEndpoint(query, this.shelfId, 5);
	axios.get(endpoint)
	  .then(data => self.appendResultList(data.data))
	  .catch(error => self.appendResultList(`<li>Não foi encontrado nenhum resultado</li>`))

  }

  appendResultList(resultList){
	console.log(resultList);
	if ( !resultList ) resultList = `<li>Não foi encontrado nenhum resultado</li>`;
	const list = $('.search-form__result-list');

	list.empty();
	list.show();
	list.append(resultList);

  }



}



window.searchForm = new SearchForm('#header-form');





