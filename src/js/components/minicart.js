class Minicart {
	constructor() {
		$(window).on("orderFormUpdated.vtex", (evt, orderForm) => {
			this.update(orderForm);
		});
		vtexjs.checkout.getOrderForm();
	}
	renderItem(item, i) {
		let { quantity } = item;
		return `
		<li class="minicart-product" data-item-id="${item.id}">
		  <div class="minicart-product__image"><img src="${item.imageUrl}"></div>
		  <div class="minicart-product__info">
			<h4 class="minicart-product__name">${item.name}</h4>
			<strong class="minicart-product__price">R$ ${(
				item.price / 100
			).formatMoney()}</strong>
		  </div>

			<button class="minicart-product__remove" type="button" onclick="Minicart.removeItem.apply(null, [${i}])" title="Remover ${
			item.name
		} do carrinho"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
		<g id="Icons" style="opacity:1;">
			<g id="close">
				<polygon id="x" style="fill-rule:evenodd;clip-rule:evenodd;" points="18.717,6.697 17.303,5.283 12,10.586 6.697,5.283    5.283,6.697 10.586,12 5.283,17.303 6.697,18.717 12,13.414 17.303,18.717 18.717,17.303 13.414,12   "/>
			</g>
		</g>
		<g id="Guides" style="display:none;"></g>
	</svg>
	</button>
		</li>
	  `;
	}

	renderItems() {
		return this.orderForm.items.map(this.renderItem, this).join("");
	}

	render() {
		let qty = this.getQuantity();
		return `
		<div class="minicart ${qty > 0 ? "is-not-empty" : "is-empty"}">
			<button class="minicart__handle" title="sacola">
				<div class="minicart__count">
					<i class="icon-cart--white">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26" viewBox="0 0 26 26"><defs><path id="gn92a" d="M1308.314 12.193a.782.782 0 0 1-.57.95l-2.63.657-2.263 14.34v.009l-.003.017c-.009.043-.03.082-.046.123-.016.047-.026.094-.046.135-.026.043-.063.078-.096.117-.029.033-.05.068-.08.094-.04.035-.092.058-.139.084-.033.017-.06.039-.095.053a.755.755 0 0 1-.276.05h-14.669l.392 1.566h15.843a.782.782 0 1 1 0 1.565h-16.455a.796.796 0 0 1-.28-.053c-.03-.013-.055-.03-.084-.047a.825.825 0 0 1-.152-.102c-.025-.026-.05-.052-.072-.08a.787.787 0 0 1-.096-.141c-.018-.036-.035-.07-.048-.108-.008-.021-.02-.04-.027-.062l-.782-3.131-2.352-9.393a.826.826 0 0 1-.012-.32c.005-.028.021-.052.03-.08a.827.827 0 0 1 .088-.214c.003-.006.003-.014.007-.02.02-.027.048-.041.071-.065a.831.831 0 0 1 .142-.136c.04-.025.081-.04.125-.06.04-.016.074-.044.118-.054.02-.005.036 0 .053-.003s.03-.014.043-.015l19.296-2.315.397-2.512a.781.781 0 0 1 .584-.636l3.134-.783a.784.784 0 0 1 .95.57zm-19.684 15.062l-1.178-8.23-2.429.292 1.987 7.938zm3.215 0l-.395-8.708-2.44.293 1.202 8.415zm3.605-9.188l-2.439.292.405 8.896h1.636zm4.005-.48l-2.428.29-.407 9.378h1.623zm3.272-.393l-1.67.2-1.234 9.86h1.561zm-12.412 16.324a1.566 1.566 0 0 1 0 3.131 1.566 1.566 0 1 1 0-3.131zm10.19 0a1.566 1.566 0 1 1 0 3.13 1.566 1.566 0 0 1 0-3.13z"/></defs><g><g transform="translate(-1283 -11)"><use fill="#fff" xlink:href="#gn92a"/></g></g></svg>
					</i>
					<span class="minicart__count-value">${this.printQuantity(qty)}</span>
				</div>
			</button>
		   <div class="minicart__overlay"></div>
		   <div class="minicart__container">
			   <div class="minicart__header">
				   <button class="minicart__handle" title="sacola">
				   <span class="minicart__title">Minha Compra</span>
				   <i class="minicart__icon">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
							<g id="Icons" style="opacity:1;">
								<g id="close">
									<polygon id="x" style="fill-rule:evenodd;clip-rule:evenodd;" points="18.717,6.697 17.303,5.283 12,10.586 6.697,5.283    5.283,6.697 10.586,12 5.283,17.303 6.697,18.717 12,13.414 17.303,18.717 18.717,17.303 13.414,12   "/>
								</g>
							</g>
							<g id="Guides" style="display:none;"></g>
						</svg>
				   </i>
				   </button>
			   </div>
			   <div class="minicart__content">
				   <ul class="minicart__products">
					   ${this.renderItems()}
				   </ul>
			   </div>
			   <div class="minicart__footer">
				   <div class="minicart__totals">
					   <span class="minicart__totals-text">Total</span>
					   <strong class="minicart__totals-value">${this.getTotal()}</strong>
				   </div>
				   <a class="minicart__checkout" href="/Site/Carrinho.aspx"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26" height="26" viewBox="0 0 26 26"><defs><path id="gn92a" d="M1308.314 12.193a.782.782 0 0 1-.57.95l-2.63.657-2.263 14.34v.009l-.003.017c-.009.043-.03.082-.046.123-.016.047-.026.094-.046.135-.026.043-.063.078-.096.117-.029.033-.05.068-.08.094-.04.035-.092.058-.139.084-.033.017-.06.039-.095.053a.755.755 0 0 1-.276.05h-14.669l.392 1.566h15.843a.782.782 0 1 1 0 1.565h-16.455a.796.796 0 0 1-.28-.053c-.03-.013-.055-.03-.084-.047a.825.825 0 0 1-.152-.102c-.025-.026-.05-.052-.072-.08a.787.787 0 0 1-.096-.141c-.018-.036-.035-.07-.048-.108-.008-.021-.02-.04-.027-.062l-.782-3.131-2.352-9.393a.826.826 0 0 1-.012-.32c.005-.028.021-.052.03-.08a.827.827 0 0 1 .088-.214c.003-.006.003-.014.007-.02.02-.027.048-.041.071-.065a.831.831 0 0 1 .142-.136c.04-.025.081-.04.125-.06.04-.016.074-.044.118-.054.02-.005.036 0 .053-.003s.03-.014.043-.015l19.296-2.315.397-2.512a.781.781 0 0 1 .584-.636l3.134-.783a.784.784 0 0 1 .95.57zm-19.684 15.062l-1.178-8.23-2.429.292 1.987 7.938zm3.215 0l-.395-8.708-2.44.293 1.202 8.415zm3.605-9.188l-2.439.292.405 8.896h1.636zm4.005-.48l-2.428.29-.407 9.378h1.623zm3.272-.393l-1.67.2-1.234 9.86h1.561zm-12.412 16.324a1.566 1.566 0 0 1 0 3.131 1.566 1.566 0 1 1 0-3.131zm10.19 0a1.566 1.566 0 1 1 0 3.13 1.566 1.566 0 0 1 0-3.13z"></path></defs><g><g transform="translate(-1283 -11)"><use fill="#fff" xlink:href="#gn92a"></use></g></g></svg>Finalizar Pedido</a>
			   </div>
		   </div>
		</div>
	  `;
	}

	removeItem(index) {
		vtexjs.checkout.removeItems([{ index }]);
	}

	updateItem(obj) {
		let { index, qty, calc } = obj;
		let quantity = qty + +calc;
		if (quantity) {
			vtexjs.checkout.updateItems([{ index, quantity }], null, false);
		}
	}

	getTotal() {
		const itemsTotal = this.orderForm.totalizers.find(
			item => item.id === "Items"
		);
		const total = itemsTotal ? itemsTotal.value / 100 : 0;
		return `R$ ${total.formatMoney()}`;
	}

	getQuantity() {
		const qty = this.orderForm.items.reduce(
			(prev, next) => prev + next.quantity,
			0
		);
		return qty;
	}

	printQuantity(qty) {
		return `${qty}`;
	}

	update(orderForm) {
		this.orderForm = orderForm;
		this.mount();
	}

	mount() {
		$(".js-minicart").html(this.render());
	}
}

$(document).ready(function() {
	window.Minicart = new Minicart();

	$("body").on("click", ".minicart__handle", function() {
		$(".minicart").toggleClass("active");

		if ($(".minicart").hasClass("active")) {
			$(".slide-count-wrap").hide();
			$(".banner--full .banner__button").hide();
			$("body").css("overflow-y", "hidden");
		} else {
			$(".slide-count-wrap").show();
			$(".banner--full .banner__button").show();
			$("body").css("overflow-y", "auto");
		}
	});
});
