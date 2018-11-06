class Filter {
    constructor(){
		this.openFilter();
	}
	
	openFilter() {
		$('.btnOpenFilter').on('click', function(e) {
			e.preventDefault();
			if($('.category__filter.filter').hasClass('active')) {
				$(this).html('<i class="icon-arrow_filter"/>MONSTRAR FILTRO');
				$('.category__filter.filter').fadeOut();
				$('.category__filter.filter').removeClass('active');
			} else {
				$(this).html('<i class="icon-arrow_filter"/>FECHAR FILTROS');
				$('.category__filter.filter').fadeIn();
				$('.category__filter.filter').addClass('active');
			}
		})
	}
}

if($('body').hasClass('catalog')){
  	window.filter = new Filter();
}

