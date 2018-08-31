class Minicart {
     constructor() {
       $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
         this.update(orderForm)
       })
       vtexjs.checkout.getOrderForm()
     }
     renderItem(item, i) {
       let { quantity } = item
       return `
         <li class="minicart-product" data-item-id="${item.id}">
           <div class="minicart-product__image"><img src="${item.imageUrl}"></div>
           <div class="minicart-product__info">
             <h4 class="minicart-product__name">${item.name}</h4>
             <strong class="minicart-product__price">R$ ${(item.price / 100).formatMoney()}</strong>
           </div>
           
             <button class="minicart-product__remove" type="button" onclick="Minicart.removeItem.apply(null, [${i}])" title="Remover ${item.name} do carrinho">Remover</button>
         </li>
       `
     }

     renderItems() {
       return this.orderForm.items.map(this.renderItem, this).join('')
     }

     render() {
       let qty = this.getQuantity()
       return `
         <div class="minicart ${qty > 0 ? 'is-not-empty' : ''}">
            <button class="minicart__handle" title="sacola">
                <span class="minicart__count">
                    <i class="minicart__icon"><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.49 37.46"><g data-name="Menu bar"><g data-name="Meu carrinho"><g data-name="&lt;Grupo&gt;"><path data-name="&lt;Caminho composto&gt;" d="M.89 2.31l3.93 1L8.2 24.76a1.22 1.22 0 0 0 .07.18 1.51 1.51 0 0 0 .07.2 1.54 1.54 0 0 0 .14.18 1.43 1.43 0 0 0 .12.14 1.14 1.14 0 0 0 .21.13l.14.08a1.15 1.15 0 0 0 .41.07H31.3l-.59 2.34H7.02a1.17 1.17 0 1 0 0 2.34h24.61a1.19 1.19 0 0 0 .42-.08l.13-.07a1.21 1.21 0 0 0 .23-.15l.11-.12a1.11 1.11 0 0 0 .14-.21 1 1 0 0 0 .07-.16v-.09l1.17-4.68 3.52-14a1.23 1.23 0 0 0 0-.48 1.09 1.09 0 0 0 0-.12 1.2 1.2 0 0 0-.13-.32 1.19 1.19 0 0 0-.11-.1 1.16 1.16 0 0 0-.21-.2 1.1 1.1 0 0 0-.19-.09 1.05 1.05 0 0 0-.18-.08h-.14L7.61 5.93l-.59-3.76a1.17 1.17 0 0 0-.87-1L1.46 0a1.19 1.19 0 0 0-.57 2.31zm28.58 21.11l1.76-12.31 3.63.44-3 11.87h-2.42zm-4.81 0l.59-13 3.65.44-1.8 12.59h-2.44zM19.27 9.68l3.65.44-.61 13.3h-2.45zm-6-.72l3.63.43.61 14h-2.43zm-4.89-.59l2.5.3 1.9 14.75h-2.33zM24.6 35.12a2.34 2.34 0 1 0 2.34-2.34 2.34 2.34 0 0 0-2.33 2.34zm-15.24 0a2.34 2.34 0 1 0 2.34-2.34 2.34 2.34 0 0 0-2.33 2.34z" fill="#616161"/></g></g></g></svg></i>
                    <span class="minicart__count-value">${this.printQuantity(qty)}</span>
                </span>
            </button>
            <div class="minicart__overlay"></div>
            <div class="minicart__container">
                <div class="minicart__header">
                    <button class="minicart__handle" title="sacola">
                        <i class="minicart__icon"><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></i>
                        <span class="minicart__title">Minha Compra</span>
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
                    <a class="minicart__checkout" href="/Site/Carrinho.aspx">
                    Finalizar Pedido</a>
                </div>
            </div>
           
         </div>
       `
     }
     
     removeItem(index) {
       vtexjs.checkout.removeItems([{index}])
     }
     
     updateItem(obj) {
       let { index, qty, calc } = obj
       let quantity = qty + +calc
       if (quantity) {
         vtexjs.checkout.updateItems([{index, quantity}], null, false)
       }
     }
     
     getTotal() {
       const itemsTotal = this.orderForm.totalizers.find(item => item.id === 'Items')
       const total = itemsTotal ? itemsTotal.value / 100 : 0
       return `R$ ${total.formatMoney()}`
     }
     
     getQuantity() {
       const qty = this.orderForm.items.reduce((prev, next) => prev + next.quantity, 0)
       return qty
     }
     
     printQuantity(qty) {
       return `${qty}`
     }
     
     update(orderForm) {
       this.orderForm = orderForm
       this.mount()
     }
     
     mount() {
       $('.js-minicart').html(this.render())
     }
}

$(document).ready(function(){
    window.Minicart = new Minicart();

    $('body').on('click', '.minicart__handle', function(){
        $('.minicart').toggleClass('active');
    })
})