import {
	getProductWithVariations
} from '../modules/vtexRequest';
import {
	isMobile,
	slugify
} from '../utils';
class Product {
	constructor() {
		const productId = $('#___rc-p-id').val();
		let self = this;
		const productWithVariations = getProductWithVariations(productId);
		productWithVariations.then(product => {
			if (product.available) {
				self.renderSkuSelectors(product);
			} else {
				self.renderFormNotifyMe(product);
			}
		})
	}

	renderSkuSelectors(product) {
		console.log(product);
		const select = `
            <div class = "product__skus--size product__skus--select">
                <span class="product__skus-title">Tamanho</span>
                <select name="sku-size">
                    ${this.createSkuSelect(product.dimensionsMap.Tamanho)}
                </select>
            </div>`;
		const list = `
            <div class="product__skus--color product__skus--thumb">
                <span class="product__skus-title">Cor</span>
                <ul>
                    ${this.createSkuThumb(product.dimensionsMap.Cor)}
                </ul>
            </div>`;
		const skus = `<div class="product__skus-inner">
                ${list}
                ${select}
        </div>`
		$('.product__skus').html(skus);
		$(window).trigger('skuSelectorCreated');
	}

	createSkuSelect(dimensions) {
		return dimensions.map(dimension => `<option value="${dimension}">${dimension}</option>`).join('');
	}

	createSkuThumb(dimensions) {
		return dimensions.map(dimension => `<li><label for="${slugify(dimension)}">${dimension}</label><input type="radio" id="${slugify(dimension)}" name="sku-color" value="${dimension}"></li>`).join('');
	}

	renderFormNotifyMe() {
		const html = `<div class="product__unavailable">
			<span class="product__unavailable-title"> PRODUTO INDISPONÍVEL</span>
			<p class="product__unavailable-text">
				Preencha os dados e clique no botão abaixo para ser avisado quando houver disponibilidade.
			</p>

			<form class="form" id="form-notifyme">
				<div class="form-control">
					<input class="input" type="text" placeholder="Insira seu nome" name=""/>
				</div>
				<div class="form-control">
					<input class="input" type="email" placeholder="Insira seu e-mail" name="" />
				</div>
				<button class="btn btn--primary">Avise-Me</button>
			</form>
		</div>`;

		$('.product__action').hide();

		$('.product__skus').html(html);
	}
}

$(document).ready(() => {
	if ($('body').hasClass('product')) {
		window.Product = new Product();
		if (isMobile.any()) {
			$('.thumbs').slick({
				arrows: false,
				dots: true
			});
		}



		$(window).on('skuSelectorCreated', () => {
			$('select').each(function () {
				var $this = $(this),
					numberOfOptions = $(this).children('option').length;

				$this.addClass('select-hidden');
				$this.wrap('<div class="select"></div>');
				$this.after('<div class="select-styled"></div>');

				var $styledSelect = $this.next('div.select-styled');
				$styledSelect.text($this.children('option').eq(0).text());

				var $list = $('<ul />', {
					'class': 'select-options'
				}).insertAfter($styledSelect);

				for (var i = 0; i < numberOfOptions; i++) {
					$('<li />', {
						text: $this.children('option').eq(i).text(),
						rel: $this.children('option').eq(i).val()
					}).appendTo($list);
				}

				var $listItems = $list.children('li');

				$styledSelect.click(function (e) {
					e.stopPropagation();
					$('div.select-styled.active').not(this).each(function () {
						$(this).removeClass('active').next('ul.select-options').hide();
					});
					$(this).toggleClass('active').next('ul.select-options').toggle();
				});

				$listItems.click(function (e) {
					e.stopPropagation();
					$styledSelect.text($(this).text()).removeClass('active');
					$this.val($(this).attr('rel'));
					$list.hide();
				});

				$(document).click(function () {
					$styledSelect.removeClass('active');
					$list.hide();
				});

			});
		});
	}

})
