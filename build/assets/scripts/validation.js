/******************** Навешиваем маски на data-type="tel" и data-type="email" ****************/
$(document).ready(function () {
	$(document).find('[data-type="tel"]').inputmask({
		mask: "+7 (999) 999-99-99",
		showMaskOnHover: false,
		showMaskOnFocus: true
	});
	$('[data-type="email"]').each(function () {
		if ($(this).attr('data-regexp') === undefined) {
			$(this).inputmask({
				alias: "email",
				showMaskOnHover: false,
				showMaskOnFocus: true
			})
		}
	})
});

var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;

/********************** Убирая фокус с текстовых инпутов без data-required подсвечиваем бордер, если заполнено. Убираем подсветку, если пусто *************/
$(document).on('blur', 'input:not(input[data-type="tel"]):not(input[data-type="email"]), textarea', function () {
	if ($(this).val() != '') {
		$(this).addClass('input-border');
	} else {
		$(this).removeClass('input-border');
	}
});

/************************ Подсветка ошибки в текстовых полях с data-required **********************/


/*********************** Убирая фокус с data-type="tel" и data-type="email" подсветка **********************/
$(document).on('blur', 'input[data-type="tel"], input[data-type="email"]', function () {
	if ($(this).attr('data-required') !== undefined) {

		if ($(this).attr('data-regexp') !== undefined) {
			if ($(this).val() != '') {
				if ($(this).val().search(pattern) == 0) {
					$(this).removeClass('input-err');
					$(this).addClass("input-border");
				} else {
					$(this).addClass('input-err');
					$(this).removeClass("input-border");
				}
			} else {
				$(this).removeClass('input-err');
				$(this).removeClass("input-border");
			}
		} else {
			if (!$(this).inputmask("isComplete")) {
				$(this).addClass("input-err");
				$(this).removeClass("input-border");
			} else {
				$(this).removeClass("input-err");
				$(this).addClass("input-border");
			}
			if ($(this).val() == '') {
				$(this).removeClass("input-err");
				$(this).removeClass("input-border");
			}
		}

	} else {
		if ($(this).attr('data-regexp') !== undefined) {
			if ($(this).val().search(pattern) == 0) {
				$(this).addClass("input-border");
			} else {
				$(this).removeClass("input-border");
			}
		} else {
			if (!$(this).inputmask("isComplete")) {
				$(this).removeClass("input-border");
			} else {
				$(this).addClass("input-border");
			}
		}
	}
});

/******************* Функция валидации ******************/

/* Эта функция вставляется в обработчик события клика по submit в таком виде:  
  внутри функции клика на отправку
      
 *
 * 
 * 
 * 
*/
$(document).on('click', 'button[type="submit"]', function (e) {
	e.preventDefault();
	let form = $(this).closest('form');
	if (raValidation(form)) {
		form.submit();
	};
});
function raValidation(form) {
	let inputs = form.find('[data-required=""]'),
		temp = true;
	for (var i = 0; i < inputs.length; i++) {
		if (!inputs.eq(i).hasClass('input-border')) {
			inputs.eq(i).addClass('input-err');
			temp = false;
		} else {
			inputs.eq(i).removeClass('input-err');
		}
	}
	console.log(temp)
	if (temp == false) {
		return false;
	} else {
		return true;
	}

}

/******************* Функция для sucsess *********************/
function ifSuccess(form) {
	form.find('input, textarea, button').attr('disabled', 'disabled');
	setTimeout(function () {
		form.find('input, textarea').val('');
		form.find('input, textarea, button').removeAttr('disabled');
	}, 2000);
}

/******************* Функция для error *****************/
function ifError(form) {
	form.find('input, textarea, button').attr('disabled', 'disabled');
	setTimeout(function () {
		form.find('input, textarea, button').removeAttr('disabled');
	}, 2000);
}
