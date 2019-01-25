import { getProductWithVariations } from "../modules/vtexRequest";
import SimulateShipping from "./simulateShipping";
import { timeout } from "q";

class Product {
	constructor() {
		const productId = $("#___rc-p-id").val();
		let self = this;
		this.simulateShipping();
		this.thumbsClickEvent();
		this.thumbsNew();
		const fix_zoom = function() {
			window.LoadZoom = function(pi) {
				const zoomImage = $(".image-zoom");
				$(".zoomPup, .zoomWindow, .zoomPreload").remove();
				if (!zoomImage.length) {
					const img = $("#image-main");
					const imgUrl = img.attr("src");
					img.wrap(`<a href="${imgUrl}" class="image-zoom" />`);
				}
				const zoom = $("#image")
					.addClass("easyzoom easyzoom--overlay")
					.easyZoom();
				window.zoomAPI = zoom.data("easyZoom");
				window.ImageControl = () => null;
			};
			LoadZoom(0);
		};
		$(fix_zoom);

		$(".button--plus").on("click", () => {
			self.changeQuantity(1);
		});

		$(".button--minus").on("click", () => {
			self.changeQuantity(-1);
		});

		// $(".image-zoom").on("click", function(e) {
		// 	e.preventDefault();
		// 	$(".product__zoom").addClass("is-active");
		// });

		// $(".product__zoom .btn--close").on("click", function(e) {
		// 	e.preventDefault();
		// 	$(".product__zoom").removeClass("is-active");
		// });

		$(".buy-button.buy-button-ref").on("click", function(e) {
			e.preventDefault();
			let sku = $(this)
				.attr("href")
				.split("sku=")[1]
				.split("&qty")[0];

			let qty = $(".product__qtd-value").val();

			let item = {
				id: sku,
				quantity: qty,
				seller: "1"
			};
			console.log(item);
			vtexjs.checkout.addToCart([item], null).done(function(orderForm) {
				console.log(orderForm);
			});
		});
		$(".product__sizes").on("click", function(e) {
			e.preventDefault();
			alert("em breve");
			// $("body").toggleClass("modal-active");
			// $(".section__modal").addClass("is-openned");
			// $(".modal__medidas-content").fadeIn();
		});

		$(".modal__medidas-close").on("click", function(e) {
			e.preventDefault();
			$(".modal__medidas-content").fadeOut();
			setTimeout(function() {
				$("body").removeClass("modal-active");
				$(".section__modal").removeClass("is-openned");
			}, 500);
		});

		// MOBILE ONLY

		if ($(window).width() <= 799) {
			$(".thumbs li").each(function(index) {
				const url = $(this)
					.find("a")
					.find("img")
					.attr("src");
				const urlReplace = url.replace("-100-150", "-400-600");
				$(this)
					.find("a")
					.find("img")
					.attr("src", urlReplace);
			});
			$(".shipping").appendTo(".product__group--mobile");

			$(".product__shipping").on("click", function(e) {
				e.preventDefault();
				$(".shipping").fadeToggle();
			});
			$(".product__information-txt").on("click", function(e) {
				e.preventDefault();
				$(".product__info-group").fadeToggle();
				$(this).toggleClass("is-opened");
			});
			$(".specification").on("click", function(e) {
				e.preventDefault();
				$(".skuList").fadeToggle();
				$(this).toggleClass("is-opened");

				// const mob__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAJ80lEQVRoQ72ae4xcdRXHP+fO3e4uK1v0D9oOCVgeif6BVArGCIqCQSQ+upS2ChZKhLbyaoDG8n5EeURAcAFtSyItIsa20pYgpAlPNcaErjz6ByYuCKR1yjPaDdt93Ps75vzuvbMz05mdO7OLv6SdnTu/x/n+zjnfc37nd4VpaqraBZwAzAM+CxwNHA4cCvSmy+wD3lXVt0VkEHgNeBnYKSIj0yGKTGUSVbXx3wC+DnwVmF85n6oikmuJAeB54Glgh4hou3LlWq12clXtAc4GPQvkO3V+zwvED60B/jjwGLBFRD5qFVjLgFQNBEtVdUGz3W9BQ2VQFWO2Ab8REQOXu+UGpKpHASuB5ara2wxMbgkm72g+tx64T0TezjNnLkCqejqwCjiz0aRm9EIEGtofiSn5Z8mnNf+46kseEX2fJ4E7ROTPzUY0BaSq5wBXA8fWn8yhBNWCOyBwqAaI2JcMXIAq5OOJdFNSYlHVXSJyvYiYjzVskwJS1QuAm4AjJt0ZBRWHEKTCm6YEoVChmkxrHu2EtppuaRVpvAWsFpEtjeRpOF2qmduagVEmgGSqMHCOgIJTCJIlJjRjGrUHKagcgGqEN1CXN9JU3elUx09XLdwlIg3MbGKJzE9MSiVGpFDlPAYu8Z9g4nkzR2jwewUD7gIuqedTBwAyNlPVfhFpSADV6zm/24j5jDlIgff2/ItHH76d7513NbMPO9JrxMAGFMqaMs2WTS8HwDohwIjiR7XsdwCgOI7vDIJgdY410i4JEO8vAntLb7Nh7Y8ZGx4j/EQ3P7zwFmYVjzaXgirznCCTZmtlYCpBpX9fIyJ3VI6vAqQanQWFhypyr2ZrJdSsJiq8s/d1Nqy9kfH9Q373cTGdBx/CsgtvYtZhR1P2Nz8o0dAUm8WpxSKyI5unDChNZx4Bt6D1hRx797zJxvU3Mja8jziVM/De75hx0CEsu+hmZhWPSlOiajBTjFOWUZwrIsOJr6ZNVc8HNrS6YybMfz58l3X9VzD60T5cUCA0t0pndqmp9XT1cN6KO5hVTCJAJev57ylxtBqnUnkXZilSEryTrNmQ+kSzlRzM+o/s/4iN665l7543vAZiCSnERtnjOAkRF1OQkM7uLs5dcStzikemO5kRSiVrth6n0vRopWXpGaAzgKda1U65v8LISALqnT27iWWMIAgQp9heeZD2GSjd3Z0sXX47xeKRVctNQ5w6RUT+lAG6C7iqcoW8WirHIRzDw8NsfPA63ttjsS9pMTGhCq4gOGdpj9DT1e3N79A5hyeMMsU4lcp6rYjcLulJ8y+1h7O82sqYS9WCqjCyfz8Pr7+B0u5/JoKadhA6VIkNVBzQIXjzW7r8J8z27Df1OAXYIfFkA3Qy0DSLbQwwY6z005vfEA+tv95rykih4CASJVRFxRLUGA2Eru5eLvDsN7U4VeH3JxmgS+28kVcjB/RLOde8sXw8EMfI6DAP//IG9pZex0lAoI7Y8nINPBhrgUZ09nxyOuPUSgP0AHBx24AaDDS7Hh0dZePaNbzz77cgTVRdmttZrEs0F3NQdy/LVtzGocUjEAvRPpVqS6J+A2RR1g5w0948qJFhNqRE4WJLvhOVmkbNHI0J48DR0zWT85ff7DMKA+UjidgRpKW2wwBZKekzLQ2r6FyPDWufjQzv59fr1/DBnjdTMEkqYdoquJA4iPz37q6DOW/lT5k9Z26rQDKJ/mGAPgA+1S6g5uMcTgPGR4d56FdXUyq9hVWpxAkaKBIX0ILnQXARXT0HsfQii1OfbsfsPjRA40DYXLB2eyQ+YRY0un+Idb9YzX8/LHlzM4IwoijY/1rwwdg5I4pe1tz025aO6ql00ccOqFw8IeSlgRfYvukegjhGghk4jdAgxrLZkAAtKJE6+hZfxXHzv5z6UL6MPDVzD+hjNbkk8MIrL77A1i2/8FRtDJelRBaTCjKDccZ8xahvyZUcN/9L/uR7wPG+uZF4k5sSKdRbo5IUjK137XyG7Zvv80mvxaDkWJGQQhKPAm+CCxZfzLz5VlXOp5Vs7Yr1XpsybVfmcla2Sg5ulqIlfrNr57Ns29TviSByAWFgAdZ0lvTzsSgI6Ft8OfPmn1p+noBq+RD4ZMPAmjc59THFSgl+x5MKXTZ214vPsnVzP+OFiCAWQgmI1EAEyfkniIklYOHCy/jciadVsFoCtlVNAfdOPfVJly6f+33m7LzPbN90PxJE3tGz0rEFUmMz8yErdS1Ycinzjj8VNYhG5y2aW43ZrSgnp61opNpvErMol31VeeXvz/H47/t9EuoIUzOz2GM+lBYfgb6zV3HciV9Lgq1lBx5OZo6t+ZHNMT4+/sWq40O96kpzYpnoYeN3DbzAY5t/XnZ27zt2eFXnwQTOqkMx3158GfNOOC3J3epqpWX/GRgcHDzJp0pxHN8VBMFV7Wop086rO5/lD5vuJqSLiLGk6GjixoIUEjIwhutbdDnHnvgVlDAFlPlLqm1f/84PKJX7bhFZXT6Cq+pTbV+RKLw08AyPb+n3KY1F/1AL5RzN0hs7fhs1f3fRZXz+hFPAhRWKqRR+ghBaKZhEUXRGR0fHjrpFkpbMDHh/9xs8cN+V3kes4KiMokEHBed8Scu0Yr7Ut8jYLPGZiSy6viYSMLm1ZDcSdgGXFZt8paetMhZ2J0TI1k33YzRtcSgJmEkcmY44k8MVlonIxqqNskKjqj4iIgta0VASh0wzwrbN92J+ZCmMCzIwTEucqco+nPPUn7atpVLpB8VisbrQmApm96dtlYItjhijbdt8D6+++BzoDGIZp2/JFdMSZxps8r44js8Jw/CP2e/1bh/utEul3FryeVnsbx2yOvf2Tf0MDDzDWUtWpenM9MSZSplSjf1MRNZUPq97nQL0q+qZuVjP396ZwFnakzh8ae/rzJl91CRF+dwO32hvnyiVSpcWi8WJImAV2VQMs0tiVW3hwqu6lJVEfavwWBCtzMvaizNlP524nH15aGjokt7e3r/Wop2GK8m0+GnspkF6A5mBqA6YyeLtxZlMcOfcm1EUXdHZ2Wm1+APapEWVlMpvmfyeNbu4mgDhja98rpiWOJNl8G+MjY3d0NnZ+WgjO2xaJVLV7wPXNL7WT6bOESty80y9jqo6EMfxdZYNTDZRU0CpsOZTq/Lfu9ZfcjLQtb/VXD8+MTQ0dOvMmTP/1mxXcgFKQdmrMSvSf9nrYi1pJk8Nr0bg94G1pVLpwWKxOH2vxtTw/7eAZcDC7HkbglbJXefYYo73SBRF6zo6Og5gsimbXO0EqtqdAlqU3fpV+tEUAVqi+bvBwcGtxxxzzGgzE8tN23kmSq8y7TrmNOCbwBfyjKtDIgPOueedc0+HYfj/fwGwAQvNSF/RPL6VVzSjKHp59+7dO+fOnTstr2j+D9mz+x3ESBh1AAAAAElFTkSuQmCC"/></g></g></svg></button>`;
				// const mob__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,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"/></g></g></svg></button>`;
				// const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
				// const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;

				// $(".thumbs").removeClass('slick-initialized');
				// $(".thumbs").removeClass('slick-slider');
				// $(".thumbs").removeClass('slick-dotted');

				// setTimeout(function(){
				// 	console.log('foie')
				// 	$(".thumbs").slick({
				// 		centerMode: true,
				// 		centerPadding: "30px",
				// 		slidesToShow: 1,
				// 		mobileFirst: "true",
				// 		arrows: false,
				// 		prevArrow: mob__prev,
				// 		nextArrow: mob__next,
				// 		dots: true,
				// 		responsive: [
				// 			{
				// 				breakpoint: 800,
				// 				settings: "unslick"
				// 			}
				// 		]
				// 	});
				// }, 4000);

			});
		}
	}
	thumbsNew() {
		setTimeout(() => {
			let thumbs = $('.thumbs').html();
			$('#show').append('<div class="newThumbs thumbs">'+thumbs+'</div>');
	
			const mob__next = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,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"/></g></g></svg></button>`;
			const mob__prev = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAJ80lEQVRoQ72ae4xcdRXHP+fO3e4uK1v0D9oOCVgeif6BVArGCIqCQSQ+upS2ChZKhLbyaoDG8n5EeURAcAFtSyItIsa20pYgpAlPNcaErjz6ByYuCKR1yjPaDdt93Ps75vzuvbMz05mdO7OLv6SdnTu/x/n+zjnfc37nd4VpaqraBZwAzAM+CxwNHA4cCvSmy+wD3lXVt0VkEHgNeBnYKSIj0yGKTGUSVbXx3wC+DnwVmF85n6oikmuJAeB54Glgh4hou3LlWq12clXtAc4GPQvkO3V+zwvED60B/jjwGLBFRD5qFVjLgFQNBEtVdUGz3W9BQ2VQFWO2Ab8REQOXu+UGpKpHASuB5ara2wxMbgkm72g+tx64T0TezjNnLkCqejqwCjiz0aRm9EIEGtofiSn5Z8mnNf+46kseEX2fJ4E7ROTPzUY0BaSq5wBXA8fWn8yhBNWCOyBwqAaI2JcMXIAq5OOJdFNSYlHVXSJyvYiYjzVskwJS1QuAm4AjJt0ZBRWHEKTCm6YEoVChmkxrHu2EtppuaRVpvAWsFpEtjeRpOF2qmduagVEmgGSqMHCOgIJTCJIlJjRjGrUHKagcgGqEN1CXN9JU3elUx09XLdwlIg3MbGKJzE9MSiVGpFDlPAYu8Z9g4nkzR2jwewUD7gIuqedTBwAyNlPVfhFpSADV6zm/24j5jDlIgff2/ItHH76d7513NbMPO9JrxMAGFMqaMs2WTS8HwDohwIjiR7XsdwCgOI7vDIJgdY410i4JEO8vAntLb7Nh7Y8ZGx4j/EQ3P7zwFmYVjzaXgirznCCTZmtlYCpBpX9fIyJ3VI6vAqQanQWFhypyr2ZrJdSsJiq8s/d1Nqy9kfH9Q373cTGdBx/CsgtvYtZhR1P2Nz8o0dAUm8WpxSKyI5unDChNZx4Bt6D1hRx797zJxvU3Mja8jziVM/De75hx0CEsu+hmZhWPSlOiajBTjFOWUZwrIsOJr6ZNVc8HNrS6YybMfz58l3X9VzD60T5cUCA0t0pndqmp9XT1cN6KO5hVTCJAJev57ylxtBqnUnkXZilSEryTrNmQ+kSzlRzM+o/s/4iN665l7543vAZiCSnERtnjOAkRF1OQkM7uLs5dcStzikemO5kRSiVrth6n0vRopWXpGaAzgKda1U65v8LISALqnT27iWWMIAgQp9heeZD2GSjd3Z0sXX47xeKRVctNQ5w6RUT+lAG6C7iqcoW8WirHIRzDw8NsfPA63ttjsS9pMTGhCq4gOGdpj9DT1e3N79A5hyeMMsU4lcp6rYjcLulJ8y+1h7O82sqYS9WCqjCyfz8Pr7+B0u5/JoKadhA6VIkNVBzQIXjzW7r8J8z27Df1OAXYIfFkA3Qy0DSLbQwwY6z005vfEA+tv95rykih4CASJVRFxRLUGA2Eru5eLvDsN7U4VeH3JxmgS+28kVcjB/RLOde8sXw8EMfI6DAP//IG9pZex0lAoI7Y8nINPBhrgUZ09nxyOuPUSgP0AHBx24AaDDS7Hh0dZePaNbzz77cgTVRdmttZrEs0F3NQdy/LVtzGocUjEAvRPpVqS6J+A2RR1g5w0948qJFhNqRE4WJLvhOVmkbNHI0J48DR0zWT85ff7DMKA+UjidgRpKW2wwBZKekzLQ2r6FyPDWufjQzv59fr1/DBnjdTMEkqYdoquJA4iPz37q6DOW/lT5k9Z26rQDKJ/mGAPgA+1S6g5uMcTgPGR4d56FdXUyq9hVWpxAkaKBIX0ILnQXARXT0HsfQii1OfbsfsPjRA40DYXLB2eyQ+YRY0un+Idb9YzX8/LHlzM4IwoijY/1rwwdg5I4pe1tz025aO6ql00ccOqFw8IeSlgRfYvukegjhGghk4jdAgxrLZkAAtKJE6+hZfxXHzv5z6UL6MPDVzD+hjNbkk8MIrL77A1i2/8FRtDJelRBaTCjKDccZ8xahvyZUcN/9L/uR7wPG+uZF4k5sSKdRbo5IUjK137XyG7Zvv80mvxaDkWJGQQhKPAm+CCxZfzLz5VlXOp5Vs7Yr1XpsybVfmcla2Sg5ulqIlfrNr57Ns29TviSByAWFgAdZ0lvTzsSgI6Ft8OfPmn1p+noBq+RD4ZMPAmjc59THFSgl+x5MKXTZ214vPsnVzP+OFiCAWQgmI1EAEyfkniIklYOHCy/jciadVsFoCtlVNAfdOPfVJly6f+33m7LzPbN90PxJE3tGz0rEFUmMz8yErdS1Ycinzjj8VNYhG5y2aW43ZrSgnp61opNpvErMol31VeeXvz/H47/t9EuoIUzOz2GM+lBYfgb6zV3HciV9Lgq1lBx5OZo6t+ZHNMT4+/sWq40O96kpzYpnoYeN3DbzAY5t/XnZ27zt2eFXnwQTOqkMx3158GfNOOC3J3epqpWX/GRgcHDzJp0pxHN8VBMFV7Wop086rO5/lD5vuJqSLiLGk6GjixoIUEjIwhutbdDnHnvgVlDAFlPlLqm1f/84PKJX7bhFZXT6Cq+pTbV+RKLw08AyPb+n3KY1F/1AL5RzN0hs7fhs1f3fRZXz+hFPAhRWKqRR+ghBaKZhEUXRGR0fHjrpFkpbMDHh/9xs8cN+V3kes4KiMokEHBed8Scu0Yr7Ut8jYLPGZiSy6viYSMLm1ZDcSdgGXFZt8paetMhZ2J0TI1k33YzRtcSgJmEkcmY44k8MVlonIxqqNskKjqj4iIgta0VASh0wzwrbN92J+ZCmMCzIwTEucqco+nPPUn7atpVLpB8VisbrQmApm96dtlYItjhijbdt8D6+++BzoDGIZp2/JFdMSZxps8r44js8Jw/CP2e/1bh/utEul3FryeVnsbx2yOvf2Tf0MDDzDWUtWpenM9MSZSplSjf1MRNZUPq97nQL0q+qZuVjP396ZwFnakzh8ae/rzJl91CRF+dwO32hvnyiVSpcWi8WJImAV2VQMs0tiVW3hwqu6lJVEfavwWBCtzMvaizNlP524nH15aGjokt7e3r/Wop2GK8m0+GnspkF6A5mBqA6YyeLtxZlMcOfcm1EUXdHZ2Wm1+APapEWVlMpvmfyeNbu4mgDhja98rpiWOJNl8G+MjY3d0NnZ+WgjO2xaJVLV7wPXNL7WT6bOESty80y9jqo6EMfxdZYNTDZRU0CpsOZTq/Lfu9ZfcjLQtb/VXD8+MTQ0dOvMmTP/1mxXcgFKQdmrMSvSf9nrYi1pJk8Nr0bg94G1pVLpwWKxOH2vxtTw/7eAZcDC7HkbglbJXefYYo73SBRF6zo6Og5gsimbXO0EqtqdAlqU3fpV+tEUAVqi+bvBwcGtxxxzzGgzE8tN23kmSq8y7TrmNOCbwBfyjKtDIgPOueedc0+HYfj/fwGwAQvNSF/RPL6VVzSjKHp59+7dO+fOnTstr2j+D9mz+x3ESBh1AAAAAElFTkSuQmCC"/></g></g></svg></button>`;
			const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
			const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
	
	
			$(".newThumbs").slick({
				centerMode: true,
				centerPadding: "30px",
				slidesToShow: 1,
				mobileFirst: "true",
				arrows: true,
				prevArrow: mob__prev,
				nextArrow: mob__next,
				dots: true,
				responsive: [
					{
						breakpoint: 800,
						settings: "unslick"
					}
				]
			});
			
		}, 1000);

	}
	thumbsClickEvent() {
		let thumbs = $(".thumbs");
		thumbs.on("click", "a", function(e) {
			e.preventDefault();
			const imgUri = $(this).attr("rel");
			zoomAPI._init();
			zoomAPI.swap(imgUri, imgUri);
			if (!imgUri) {
				zoomAPI.teardown();
			}
			thumbs.find("a").removeClass("ON");
			$(this).addClass("ON");
		});
	}
	simulateShipping() {
		window.SimulateShipping = new SimulateShipping();
	}
	changeQuantity(val) {
		let currentVal = $(".product__qtd-value").val();
		let newVal = +currentVal + +val;
		if (newVal) {
			$(".product__qtd-value").val(newVal);
		}
	}

	renderFormNotifyMe() {
		const html = `<div class="product__unavailable">
			<span class="product__unavailable-title"> PRODUTO INDISPONÍVEL</span>
			<p class="product__unavailable-text">
				Preencha os dados e clique no botão abaixo para ser avisado quando houver disponibilidade.
			</p>

			<form class="form" id="form-notifyme" action="/no-cache/AviseMe.aspx">
				<div class="form-control">
					<input class="input" type="text" placeholder="Insira seu nome" name="notifymeClientName" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Insira seu nome...'" />
				</div>
				<div class="form-control">
					<input class="input" type="email" placeholder="Insira seu e-mail" name="notifymeClientEmail" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Insira seu nome...'" />
				</div>
				<button class="btn btn--primary">Avise-Me</button>
			</form>
		</div>`;

		$(".product__action").hide();

		$(".product__group").html(html);
	}
}

$(document).ready(() => {
	if ($("body").hasClass("product")) {
		$('.product__main .product__skus li.specification').text('Tamanho');
		window.productChoice = {};
        window.Product = new Product();
        
 
        let shareWindow = function(urlProduct, urlMediaProduct){
            let facebook = "https://www.facebook.com/sharer/sharer.php?u=" + urlProduct,
            twitter = "https://twitter.com/home?status=" + urlProduct;
            
            
            $(".facebook").attr("href", facebook);
            $(".twitter").attr("href", twitter);
            
            $(".product__social-item a").on("click", function(){
                let newwindow = window.open($(this).attr('href'),'','height=600,width=600');
                if (window.focus) {newwindow.focus()}
                return false;	
            });
            
            
        }
        let urlProduct = window.location.href;
        let urlMediaProduct = $("#image img").attr("src");
        
        shareWindow(urlProduct, urlMediaProduct); 
        
        









		const mob__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,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"/></g></g></svg></button>`;
		const mob__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" viewBox="0 0 52 52"><g><g><image width="52" height="52" xlink:href="data:image/png;base64,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"/></g></g></svg></button>`;
		const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
	    const shelf__next = `<button type='button' class='slick-next shelf__button'><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31" height="59" viewBox="0 0 31 59"><defs><path id="j4iva" d="M20.598 726.843l27.965 27.727 2.427-2.307-26.515-26.573 26.602-26.574-2.53-2.306-27.95 27.727z"/></defs><g><g transform="translate(-20 -696)"><use fill="#02253c" xlink:href="#j4iva"/></g></g></svg></button>`;
        
        
        
        $(".shelf__carousel--full ul").slick({
			dots: false,
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: true,
			prevArrow: shelf__prev,
            nextArrow: shelf__next,
            variableWidth: true,
			responsive: [
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						prevArrow: mob__prev,
						nextArrow: mob__next,
                        dots: true,
                        variableWidth: false,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						prevArrow: mob__prev,
						nextArrow: mob__next,
                        dots: true,
                        variableWidth: false,
					}
				}
			]
		});
        
        
        $("#divCompreJunto").each(function( index ) {
            if( $(this).html().length == 0 ){
             $(".section__buy-together").hide();
             return false
            }
        });
        
	}
});
