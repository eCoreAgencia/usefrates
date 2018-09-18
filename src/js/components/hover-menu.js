class AddHover {
    constructor(target) {
      this.target = $('.header');
      this.beginning = $('.header__menu');
      this.hover(this.beginning);
    }
    
    hover(beginning) {
      let $hoverTarget = this.target;
      let rolloverClass = 'hover';
      $hoverTarget.hover(
        (event) => {
          $(event.currentTarget).addClass(rolloverClass);    
        },
        (event) => {
          $(event.currentTarget).removeClass(rolloverClass); 
        }
      )
    }
  }
  
  new AddHover('.header');