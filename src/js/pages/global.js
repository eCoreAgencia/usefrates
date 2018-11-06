const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


$(document).ready(() => {
    const headerFixed = () => {
        const distancePageTop = 100;
        const pageScroll = window.pageYOffset || document.documentElement.scrollTop;

        if(pageScroll >= distancePageTop){
            $('.header').addClass('header--fixed');
        }else{
            $('.header').removeClass('header--fixed');
        }
    }

    console.log(isMobile.Android());
    
    if(!isMobile.any()){
        headerFixed();

        $(window).scroll(() => {
            headerFixed();
        })
    }

    
})