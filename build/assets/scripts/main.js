/*Def скрипты*/
if (document.title == 'Главная') {
	$(document).find('.header').addClass('main');
	$(document).find('.breadcrumbs').hide();
}
if (document.title == 'Карта сайта') {
	$(document).find('.breadcrumbs, .header, .footer').hide();
}
/*Def скрипты Конец*/
$(document).ready(function () {

	/*Калькулятор*/
	if ($('#timeRange').length) {
		$('#timeRange').ionRangeSlider({
			onChange: function (data) {
				$(document).find('#time').val(data.from);
			},
			onStart: function (data) {
				$(document).find('#time').val(data.from);
			}
		});
		$('#initialRange').ionRangeSlider({
			onChange: function (data) {
				$(document).find('#initial').val(data.from.toLocaleString('ru'));
			},
			onStart: function (data) {
				$(document).find('#initial').val(data.from.toLocaleString('ru'));
			}
		});
	}
	var x = document.getElementsByName("input-vol");
	for (i = 0; i < x.length; i++) {
		x[i].onkeypress = function (e) {
			e = e || event;
			if (e.ctrlKey || e.altKey || e.metaKey) return;
			var chr = getChar(e);
			// с null надо осторожно в неравенствах,
			// т.к. например null >= '0' => true
			// на всякий случай лучше вынести проверку chr == null отдельно
			if (chr == null) return;
			if (chr < '0' || chr > '9') {
				return false;
			}
		}
	}
	/*Калькулятор Конец*/

	$('#datetimepicker').datetimepicker({
		format: "MM yyyy",
		autoclose: true,
		startView: 3,
		minView: 3,
		maxView: 4,
		orientation: "bottom left",
		language: "ru",
		endDate: new Date(),
	});


	$('.datetimepickerPhone').datetimepicker({
		format: "dd-mm-yyyy hh:ii",
		autoclose: true,
		startView: 3,
		maxView: 4,
		orientation: "bottom left",
		language: "ru",
		startDate: new Date(),
	});

	if ($('#map').length) {
		ymaps.ready(function () {
			var myMap = new ymaps.Map('map', {
				center: [55.751574, 37.573856],
				zoom: 9
			});
		});
	}

	if ($('.main-advantages').length && document.documentElement.clientWidth > 1200) {
		let advantagesItems = $('.main-advantages-wrap-content'),
			offsetTop = $(document).find('.main-advantages').offset().top,
			valueTranslate = -($(window).width() * (advantagesItems.length - 1));
		$('.main-advantages').css('height', ($(window).width() * (advantagesItems.length - 1) + $(window).height()));
		if (($(document).scrollTop() >= offsetTop) && ($(document).scrollTop() < offsetTop + $('.main-advantages').height() - $(window).height())) {
			$(document).scrollTop(offsetTop);
		} else if ($(document).scrollTop() > offsetTop + $('.main-advantages').height() - $(window).height()) {
			$(document).find('.main-advantages-wrap').css({
				'position': 'fixed',
				'top': 0,
				'left': 0,
				'transform': 'translateX(' + valueTranslate + 'px)'
			});
		}
		horizontalScroll();
	}

	$(document).find('.main-partners-slider').slick({
		dots: true,
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			}
		]
	});

	resizewindow();
	$(window).resize(function (e) {
		resizewindow();
	});
});

/*Боковое меню*/
$(document).on('click', '.header-info__burger, .overlay', function (e) {
	$(document).find('.header-popup').toggleClass('active');
	$(document).find('.overlay').fadeToggle();
	if (document.documentElement.clientWidth <= 1200) {
		$('body').toggleClass('fixed');
	}
});
/*Боковое меню Конец*/


/*Переход по ссылкам на главную*/
$(document).on('click', '.header-menu__item, .header-popup-menu__item', function (e) {
	if (window.location.pathname == '/') {
		idElem = $(this).attr('href').split('#')[1];
		if (idElem != undefined) {
			e.preventDefault();
			var valScrollTop = $('#' + idElem).offset().top
			$('body,html').animate({
				scrollTop: valScrollTop
			}, 800);
		}
	}
});
/*Переход по ссылкам на главную Конец*/


/*Кнопка наверх*/
if ($(this).scrollTop() > 500) {
	$(document).find('.toTop').show().css('display', 'flex');
};
$('.toTop').click(function () {
	$('body,html').animate({ scrollTop: 0 }, 500);
});
$(document).on('scroll', function (e) {
	if ($(document).scrollTop() > 500) {
		$(document).find('.toTop').css('display', 'flex');
	} else {
		$(document).find('.toTop').hide();
	}
});
/*Кнопка наверх Конец*/


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


/*Горизонтальный скролл*/
if ($('.main-advantages').length && document.documentElement.clientWidth > 1200) {
	let offsetTop = $(document).find('.main-advantages').offset().top;
	$(document).on('scroll', function (e) {
		horizontalScroll(offsetTop);
	});
}
function horizontalScroll(offsetTop) {
	valueTransform = -($(document).scrollTop() - offsetTop);
	if (($(document).scrollTop() >= offsetTop)) {
		if ($(document).scrollTop() > offsetTop + $('.main-advantages').height() - $(window).height()) {
			$(document).find('.main-advantages-wrap').css({
				'position': 'absolute',
				'bottom': 0,
				'top': 'auto'
			});
			$(document).find('.main-advantages__img').css({
				'position': 'absolute',
				'bottom': 0,
				'top': 'auto'
			});
			return
		}
		$(document).find('.main-advantages-wrap').css({
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'transform': 'translateX(' + valueTransform + 'px)'
		});
		$(document).find('.main-advantages__img').css('position', 'fixed');
	} else {
		$(document).find('.main-advantages-wrap').css({
			'position': 'static'
		});
		$(document).find('.main-advantages__img').css({
			'position': 'absolute',
			'top': 0
		});
	}
}
/*Горизонтальный скролл Конец*/


/*Фильтр Проекты*/
$(document).on('click', '.projects-filter__item', function (e) {
	if (!$(this).hasClass('active')) {
		$('.projects-filter__item').removeClass('active');
		$(this).addClass('active');
	}
});
/*Фильтр Проекты Конец*/


function resizewindow() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

/*Калькулятор*/
function getChar(event) {
	if (event.which == null) {
		if (event.keyCode < 32) return null;
		return String.fromCharCode(event.keyCode) // IE
	}
	if (event.which != 0 && event.charCode != 0) {
		if (event.which < 32) return null;
		return String.fromCharCode(event.which) // остальные
	}
	return null; // специальная клавиша
}
$(document).on('change', '#time, #initial', function () {
	checkInputMin($(this));
	$(this).val(parseInt($(this).val().replace(/\s+/g, '')).toLocaleString('ru'));
});
$(document).on('input', '#time, #initial', function () {
	checkInputMax($(this));
	linkInputs($(this));
});
function checkInputMax(input) {
	if (input.val().replace(/\s+/g, '') > input.data('max')) {
		input.val(input.data('max').toLocaleString('ru'));
	}
}
function checkInputMin(input) {
	if ((input.val().replace(/\s+/g, '') < input.data('min')) || (input.val().replace(/\s+/g, '') == '')) {
		input.val(input.data('min').toLocaleString('ru'));
	}
}
function linkInputs(input) {
	input.siblings('input').data("ionRangeSlider").update({
		from: input.val().replace(/\s+/g, ''),
	});
}
/*Калькулятор Конец*/


/*var tranportMsg = {
	'bus': 'Автобус',
	'underground': 'Метро',
	'minibus': 'Маршрутка',
	'trolleybus': 'Троллейбус',
	'tramway': 'Трамвай',
	'suburban': 'Электричка',
	'train': 'Поезд',
	'timetable': 'Расписание электричек'
}

var searchBlock = false;

ymaps.ready(function () {
	var center = [55.807522, 36.975659];
	var mosoblBounds = [[56.449832, 35.620037], [54.742536, 39.382855]];
	var myMap = new ymaps.Map('location__map', {
		center: center,
		zoom: 11,
		controls: ['fullscreenControl', 'typeSelector']
	});
	myMap.controls.add('zoomControl', {
		size: 'small',
		position: {
			left: '10px',
			top: '10px',
		}
	});

	var myGeoObject = new ymaps.GeoObject({
		geometry: {
			type: "Polygon",
			coordinates: [
				[
					[55.809282, 36.974633],
					[55.810962, 37.001251],
					[55.808683, 37.001398],
					[55.807572, 37.002793],
					[55.806387, 37.002321],
					[55.806448, 37.001634],
					[55.805674, 36.985927],
					[55.807390, 36.985262],
					[55.806532, 36.975992],
				]
			]
		},
		properties: {
		}
	}, {
		opacity: 1,
		fillColor: '#09215A',
		fillOpacity: 0,
		hasBalloon: false,
		hasHint: false,
		strokeColor: '#09215A',
		strokeWidth: 3,
		strokeOpacity: 0.7,
		strokeStyle: 'solid'
	});

	myMap.geoObjects.add(myGeoObject);

	//var initPoints = [$('.location__helper--preset.-active').data('from'), center]
	var initPoints = ['Москва, МКАД, 63А', center]

	var multiRoute = new ymaps.multiRouter.MultiRoute({
		referencePoints: initPoints,
		params: {
			routingMode: $('.location__tab.-active').data('route'),
			results: 1,
			boundedBy: mosoblBounds
		}
	}, {
		//routeWalkMarkerIconContentLayout: ymaps.templateLayoutFactory.createClass(''),
		//boundsAutoApply: true,
		wayPointFinishIconLayout: "default#image",
		wayPointFinishIconImageHref: "https://p-cambridge.ru/wp-content/themes/cambridge/i/marker.svg",
		wayPointFinishIconImageSize: [85, 105],
		wayPointFinishIconImageOffset: [-42, -102]
	});

	myMap.geoObjects.add(multiRoute);



	multiRoute.model.events.add("requestsuccess", function () {

		searchBlock = false;



		activeRoute = multiRoute.getActiveRoute();


		if (!activeRoute) {
			$('.location__route--field').html('Маршрут не найден')
			//} else if (activeRoute.properties.get('type') == 'driving' && activeRoute.properties.get('blocked')) {
			//$('.location__route--field').html('Маршрут невозможно проложить')
		} else {
			$('.location__route--field').html('');

			activeRouteTime = 0;

			activeRoutePoints = multiRoute.model.getReferencePoints();


			activeRouteProperties = activeRoute.properties.getAll();


			multiRouteFirst = multiRoute.getWayPoints().get(0);
			multiRouteLast = multiRoute.getWayPoints().get(multiRoute.getWayPoints().getLength() - 1);


			$('.location__route--field').append('<div class="location__route--duration"></div>');

			$('.location__route--field').append('<div class="location__route--item -first d-flex flex-column" data-bounds="' + multiRouteFirst.geometry.getBounds() + '"><div class="location__route--item--line"></div><div class="location__route--item--stop"><div class="location__route--item--icon"></div>' + activeRoutePoints[0] + '</div></div>');

			if (activeRouteProperties.type == 'masstransit') {
				activeRoute.getPaths().each(function (path) {

					segmentArray = [];
					path.getSegments().each(function (segment) {
						segmentArray[segment.properties.get('index')] = segment;
					});


					$.each(segmentArray, function (index) {

						segmentBounds = this.geometry.getBounds();
						segment = this.properties.getAll();

						activeRouteTime = activeRouteTime + segment.duration.value;

						segmentText = '';
						segmentLineColor = '';
						segmentIconColor = '';
						segmentIcon = '';
						segmentTransportTypeClass = '';
						if (segment.type == 'walk') {
							segmentText = '<svg class="icon-walk"><use xlink:href="#icon-walk"></use></svg><div class="location__route--item--distance">' + segment.distance.text + '</div>';
						} else if (segment.type == 'transfer') {
							segmentLineColorBefore = segmentArray[index - 1].properties.getAll().transports[0].Style.color ? segmentArray[index - 1].properties.getAll().transports[0].Style.color : 'green';
							segmentLineColorAfter = segmentArray[index + 1].properties.getAll().transports[0].Style.color ? segmentArray[index + 1].properties.getAll().transports[0].Style.color : 'green';
							segmentText = '<div class="location__route--item--transfer -top" style="background:' + segmentLineColorBefore + '"></div><div class="location__route--item--transfer -bot" style="background:' + segmentLineColorAfter + '"></div>';

						} else if (segment.type == 'transport') {

							segmentTransportType = segment.transports[0].type;
							segmentTransportTypeClass = '-' + segmentTransportType;

							segmentTransport = '';
							if (segmentTransportType !== 'underground' && segmentTransportType !== 'suburban') {

								if (segment.transports.length > 0) {
									var segmentTransportGroup = groupBy(segment.transports, "type");

									$.each(segmentTransportGroup, function () {
										segmentTransportPart = '';
										$.each(this, function () {
											segmentTransportPart += '<div class="location__route--item--transport">' + this.name + '</div>';
										})
										segmentTransportPartType = this[0].type;
										if (tranportMsg.hasOwnProperty(this[0].type)) {
											segmentTransportPartType = tranportMsg[this[0].type];
										}
										segmentTransportPart = '<div class="location__route--item--transport--part d-flex flex-wrap align-items-baseline"><div class="location__route--item--transport--title">' + segmentTransportPartType + '</div>' + segmentTransportPart + '</div>';
										segmentTransport += segmentTransportPart;
									});
									segmentTransport = '<div class="location__route--item--transports">' + segmentTransport + '</div>';
								}
							}

							if (segmentTransportType == 'underground') {
								segmentLineColor = 'border-color:' + (segment.transports[0].Style.color ? segment.transports[0].Style.color : 'green') + ';';
								segmentIconColor = 'background-color:' + (segment.transports[0].Style.color ? segment.transports[0].Style.color : 'green') + ';';
								segmentIcon = '<svg class="icon-metro"><use xlink:href="#icon-metro"></use></svg>';
							} else if (segmentTransportType == 'suburban') {
								segmentLineColor = 'border-color:#fff;';
								segmentIconColor = 'background-color:#666;';
								segmentIcon = '<svg class="icon-train"><use xlink:href="#icon-train"></use></svg>';
							} else {
								segmentIcon = '<svg class="icon-bus"><use xlink:href="#icon-bus"></use></svg>';
							}

							segmentTransportCount = '';
							if (segment.stops.features.length > 1) {
								segmentTransportCount = segment.stops.features.length - 1;
								if (segmentTransportType == 'underground') {
									segmentTransportCount = declOfNum(segmentTransportCount, ['станция', 'станции', 'станций']);
								} else if (segmentTransportType == 'suburban') {
									if (segment.links.length > 0) {
										segmentTransportCountLinkType = segment.links[0].type;
										if (tranportMsg.hasOwnProperty(segmentTransportCountLinkType)) {
											segmentTransportCountLinkType = tranportMsg[segmentTransportCountLinkType];
										}
										segmentTransportCount = '<a href="' + segment.links[0].href + '" target="_blank">' + segmentTransportCountLinkType + '</a>';
									}
								} else {
									segmentTransportCount = declOfNum(segmentTransportCount, ['остановка', 'остановки', 'остановок']);
								}
								segmentTransportCount = '<div class="location__route--item--count">' + segmentTransportCount + '</div>';
							}

							segmentText = '<div class="location__route--item--stop"><div class="location__route--item--icon" style="' + segmentIconColor + '">' + segmentIcon + '</div>' + segment.stops.features[0].properties.name + '</div>' + segmentTransport + '' + segmentTransportCount + '<div class="location__route--item--stop -last">' + segment.stops.features[segment.stops.features.length - 1].properties.name + '</div>'

						}
						$('.location__route--field').append('<div class="location__route--item -' + segment.type + ' ' + segmentTransportTypeClass + ' d-flex flex-column" data-bounds="' + segmentBounds + '"><div class="location__route--item--line" style="' + segmentLineColor + '"></div><div class="location__route--item--duration d-flex align-items-center">' + segment.duration.text + '</div>' + segmentText + '</div>')
					});


				});


				activeRouteTime = activeRouteTime / 60
				if (activeRouteTime < 60) {
					activeRouteTime = Math.floor(activeRouteTime) + ' мин';
				} else {
					activeRouteTime = Math.floor(activeRouteTime / 60) + ' ч ' + Math.floor(activeRouteTime % 60) + ' мин';
				}

			} else if (activeRouteProperties.type == 'driving') {
				activeRoute.getPaths().each(function (path) {
					$('.location__route--field').append('<div class="location__route--item -driving d-flex flex-column" data-bounds="' + path.getBounds() + '"><div class="location__route--item--line"></div></div>')
				});
				activeRouteTime = activeRouteProperties.duration.text + ', ' + activeRouteProperties.distance.text;
			}

			setTimeout(function () {
				myMap.setBounds(activeRoute.getBounds(), { checkZoomRange: false }).then(function () {

					multyRouteLinkType = $('.location__tab.-active').data('route');
					if (multyRouteLinkType == 'masstransit') {
						multyRouteLinkType = 'mt';
					}
					multyRouteLink = '?z=' + myMap.getZoom() + '&ll=' + myMap.getCenter()[1] + ',' + myMap.getCenter()[0] + '&rtext=' + multiRouteFirst.geometry.getCoordinates() + '~' + multiRouteLast.geometry.getCoordinates() + '&rtt=' + multyRouteLinkType + '&mode=routes';

					$('.js-route-href').attr('href', '//yandex.ru/maps/' + multyRouteLink);
					$('.js-route-href-print').attr('href', '//yandex.ru/maps/print/' + multyRouteLink);


				});
			}, 10);



			$('.location__route--field').append('<div class="location__route--item -last  d-flex flex-column" data-bounds="' + multiRouteLast.geometry.getBounds() + '"><div class="location__route--item--stop"><div class="location__route--item--icon"><img src="https://p-cambridge.ru/wp-content/themes/cambridge/i/logo-mini.svg" alt=""></div>Поселок «Кембридж»</div></div>');

			$('.location__route--duration').html('В пути: ' + activeRouteTime);


		}

	}).add("requestsend", function (event) {
		searchBlock = true;
		$('.location__route--field').html('Загрузка маршрута...')
	}).add("requestfail", function (event) {
		$('.location__route--field').html('Что-то пошло не так :(')
		//console.log('Запрос не удался '+ event.get('error'))
	});


	$('.location__helper--preset').on('click', function () {
		if (searchBlock == false && !$(this).hasClass('-active')) {
			$('.location__helper--preset').removeClass('-active');
			$(this).addClass('-active');
			$('.js-location-input').val($(this).data('from'));
			TweenMax.set($('.location__field--input > ymaps'), { autoAlpha: 0 });
			getroute($('.js-location-input').val());
		}
		return false
	});

	$('.js-location-input').on('focus', function () {
		TweenMax.set($('.location__field--input > ymaps'), { autoAlpha: 1 });
	}).on('keyup', function (e) {
		if (e.keyCode == 13) {
			getroute($('.js-location-input').val());
			$('.location__helper--preset.-active').removeClass('-active');
		}
	});


	var suggestView1 = new ymaps.SuggestView('suggest1', {
		boundedBy: mosoblBounds,
		offset: [-1, 2]
	});
	suggestView1.events.add('select', function (select) {
		getroute(select.get('item').value);
		$('.js-location-input').val(select.get('item').displayName);
		TweenMax.set($('.location__field--input > ymaps'), { autoAlpha: 0 });
		$('.location__helper--preset.-active').removeClass('-active');
	});

	$('.location__tab').on('click', function () {
		if (searchBlock == false && !$(this).hasClass('-active')) {
			$('.location__tab').removeClass('-active');
			$(this).addClass('-active');
			routingMode = $(this).data('route');
			multiRoute.model.setParams({ routingMode: routingMode, results: 1, boundedBy: mosoblBounds });
			if (routingMode == 'auto') {
				$('.location__helper').hide();
			} else {
				$('.location__helper').show();
			}
		}
		return false
	});

	function getroute(from) {
		if (searchBlock == false) {
			searchBlock = true;
			if (b64EncodeUnicode(from) == '0YXRg9C5') {
				from = '55.753290, 37.619379';
			}
			multiRoute.model.setReferencePoints([[from], center]);
		}
	}

	$(document).on('click', '.location__route--item', function (e) {
		if (!$(e.target).is('a')) {
			bounds = $(this).data('bounds');
			if (bounds.length) {
				bounds = bounds.split(',');
				myMap.setBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], { checkZoomRange: true, zoomMargin: [50, 50, 50, 50] });
			}
		}
	});

	myMap.events.add('click', function (e) {
		var coords = e.get('coords');
		getroute(coords);
		$('.location__helper--preset.-active').removeClass('-active');
		$('.js-location-input').val('');
	});

});
function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
		return String.fromCharCode(parseInt(p1, 16))
	}))
}*/