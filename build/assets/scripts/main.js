$(document).ready(function () {
	resizewindow();
	$(window).resize(function (e) {
		resizewindow();
	});
});

$(document).on('click', '.header-info__burger, .overlay', function (e) {
	$(document).find('.header-popup').toggleClass('active');
	$(document).find('.overlay').fadeToggle();
});

/*Табы*/
$(document).on('click', '.tabs-navigation-item', function (e) {
	e.preventDefault();
	let tabContainers = $(this).closest('.tabs').find('.tabs-tab');
	tabContainers.removeClass('active');
	tabContainers.filter(this.hash).addClass('active');
	$(this).closest('.tabs').find('.tabs-navigation-item').removeClass('active');
	$(this).addClass('active');
});
$(document).on('click', '.tabs-arr', function (e) {
	let navigationContainers = $(document).find('.tabs-navigation-item');
	for (let i = 0; i < navigationContainers.length; i++) {
		if ((navigationContainers.eq(i).hasClass('active')) && (i == navigationContainers.length - 1) && ($(this).hasClass('tabs-next'))) {
			navigationContainers.eq(0).click();
			return
		} else if ((navigationContainers.eq(i).hasClass('active')) && (i == 0) && ($(this).hasClass('tabs-prev'))) {
			navigationContainers.eq(navigationContainers.length - 1).click();
			return
		}
	}
	if ($(this).hasClass('tabs-prev')) {
		$(document).find('.tabs-navigation-item.active').prev().click();
	} else {
		$(document).find('.tabs-navigation-item.active').next().click();
	}
});
/*Табы Конец*/

function resizewindow() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};