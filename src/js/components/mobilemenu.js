class MobileMenu {
	constructor() {
		this.menuIcon = $(".header__menu-icon");
		this.menuMobileContent = $(".menu__mobile");
		this.events();
	}

	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}


	toggleTheMenu() {
		this.menuMobileContent.toggleClass("menu__mobile--is-visible");
		this.menuIcon.toggleClass("header__menu-icon--close-x");
	}
}

let mobileMenu = new MobileMenu;