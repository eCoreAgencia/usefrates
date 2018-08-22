import TweenMax from "gsap/TweenMax";

export default class Loader {
	constructor(element){
		this.loaderHtml = ``;
		this.render(element);
		const balls = document.querySelectorAll('.ball');
		TweenMax.staggerFromTo(balls, 1,  {
			scale: .1,
			opacity: 0
		}, {
			scale: 1.2,
			opacity: 1,
			repeat: -1,
			yoyo: true
		}, .2);
	}

	render(element){
		$(element).append();		
	}


}
