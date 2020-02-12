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

function resizewindow() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};