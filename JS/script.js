//burger
const bodyMenu = document.querySelector('body');
const burgerTouch = document.querySelector('.header_limiter_burger');
const menuOnTouch = document.querySelector('.header_limiter_menu');
const burgerPseudo = document.querySelector('.header_limiter_burger');
const burgerSpan = document.querySelector('.header_limiter_burger-span');


burgerTouch.addEventListener('click', (open) => {
	menuOnTouch.classList.toggle('header_limiter_menu__active');
	burgerPseudo.classList.toggle('header_limiter_burger__active');
	burgerSpan.classList.toggle('header_limiter_burger-span__active');
	bodyMenu.classList.toggle('body__active');
})

//menu dropList
const dropZone = document.querySelector('.header_limiter_menu_ul');
const dropLi = document.querySelectorAll('.header_limiter_menu_ul-li');
const dropList = document.querySelectorAll('.header_limiter_menu_ul-li_popup');
const dropLink = document.querySelectorAll('.header_limiter_menu_ul-li_popup-link');


function menuDropDown() {
	dropZone.addEventListener('click', (show) => {
		let showTarget = show.target.dataset['show'];
		let showTargetEl = show.target;

		switch (showTarget) {
			case "portfolio":
				getItems(showTarget);
				break;
			case "priceP":
				getItems(showTarget);
				break;
			case "servicesP":
				getItems(showTarget);
				break;
			case "contacts":
				getItems(showTarget);
				break;
			case "about":
				getItems(showTarget);
				break;
		}
		if (!showTargetEl.classList.contains('header_limiter_menu_ul-li__active')) {
			dropLi.forEach(el => {
				el.classList.remove('header_limiter_menu_ul-li__active');
			})
		}
		showTargetEl.classList.toggle('header_limiter_menu_ul-li__active');
	})
}
menuDropDown()

function getItems(className) {
	dropList.forEach(element => {
		if (element.classList.contains(className)) {
			element.classList.toggle('header_limiter_menu_ul-li_popup__active');
		} else {
			element.classList.remove('header_limiter_menu_ul-li_popup__active');
		}
	})
}
// menu closer with click out of menu elements
bodyMenu.addEventListener('click', (close) => {
	if (!close.target.classList.contains('header_limiter_menu_ul-li')) {
		dropLi.forEach(element => {
			element.classList.remove('header_limiter_menu_ul-li__active');
		})
		dropList.forEach(element => {
			element.classList.remove('header_limiter_menu_ul-li_popup__active');
		})
	}
})

// menu closer with right swipe on mobiles
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
let x1 = null;
let x2 = null;

function handleTouchStart(event) {
	const firstTouch = event.touches[0];
	x1 = firstTouch.clientX;
	y1 = firstTouch.clientY;
}
function handleTouchMove(event) {
	if (!x1 || !y1) {
		return false;
	} else {
		let x2 = event.touches[0].clientX;
		let y2 = event.touches[0].clientY;
		let xDiff = x2 - x1;
		let yDiff = y2 - y1;
		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff < 0) {
				menuOnTouch.classList.remove('header_limiter_menu__active');
				burgerPseudo.classList.remove('header_limiter_burger__active');
				burgerSpan.classList.remove('header_limiter_burger-span__active');
				bodyMenu.classList.remove('body__active');
			}
		}
	}
	x1 = null;
	y1 = null;
}
// telephone redactor
document.addEventListener("DOMContentLoaded", function () {
	let phoneInputs = document.querySelectorAll('input[data-tel-input]');

	let getInputNumbersValue = function (input) {
		// Return stripped input value — just numbers
		return input.value.replace(/\D/g, '');
	}

	let onPhonePaste = function (e) {
		let input = e.target,
			inputNumbersValue = getInputNumbersValue(input);
		let pasted = e.clipboardData || window.clipboardData;
		if (pasted) {
			let pastedText = pasted.getData('Text');
			if (/\D/g.test(pastedText)) {
				// Attempt to paste non-numeric symbol — remove all non-numeric symbols,
				// formatting will be in onPhoneInput handler
				input.value = inputNumbersValue;
				return;
			}
		}
	}

	let onPhoneInput = function (e) {
		let input = e.target,
			inputNumbersValue = getInputNumbersValue(input),
			selectionStart = input.selectionStart,
			formattedInputValue = "";

		if (!inputNumbersValue) {
			return input.value = "";
		}

		if (input.value.length != selectionStart) {
			// Editing in the middle of input, not last symbol
			if (e.data && /\D/g.test(e.data)) {
				// Attempt to input non-numeric symbol
				input.value = inputNumbersValue;
			}
			return;
		}

		if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
			if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
			let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
			formattedInputValue = input.value = firstSymbols + " ";
			if (inputNumbersValue.length > 1) {
				formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
			}
		} else {
			formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
		}
		input.value = formattedInputValue;
	}
	let onPhoneKeyDown = function (e) {
		// Clear input after remove last symbol
		let inputValue = e.target.value.replace(/\D/g, '');
		if (e.keyCode == 8 && inputValue.length == 1) {
			e.target.value = "";
		}
	}
	for (let phoneInput of phoneInputs) {
		phoneInput.addEventListener('keydown', onPhoneKeyDown);
		phoneInput.addEventListener('input', onPhoneInput, false);
		phoneInput.addEventListener('paste', onPhonePaste, false);
	}
})

// teamCards Slider
let position = 0;
let slidesToShow = 3;
const slidesToScroll = 1;
let screen = document.body.clientWidth;
if (screen < 1024) {
	slidesToShow = 2;
}
if (screen < 650) {
	slidesToShow = 1;
}
const btnPrev = document.querySelector('.teamCards_limiter_flexWithBtns-leftSwiper');
const btnNext = document.querySelector('.teamCards_limiter_flexWithBtns-rightSwiper');
const container = document.querySelector('.teamCards_limiter_flexContainer');
const track = document.querySelector('.teamCards_limiter_flex');
const items = document.querySelectorAll('.teamCards_limiter_flex_item');
const itemsCount = items.length;
const itemWidth = track.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;


items.forEach((item) => {
	item.style.flexBasis = `${itemWidth - 48}px`;
});

btnNext.addEventListener('click', () => {
	const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
	position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
	setPosition();
	checkBtns();
});

btnPrev.addEventListener('click', () => {
	const itemsLeft = Math.abs(position) / itemWidth;
	position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
	setPosition();
	checkBtns();
});

const setPosition = () => {
	track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
	if (position === 0) {
		btnPrev.disabled;
		btnPrev.style.opacity = '0.6';
	} else {
		btnPrev.style.opacity = '1';
	}
	if (position <= -(itemsCount - slidesToShow) * itemWidth) {
		btnNext.disabled;
		btnNext.style.opacity = '0.6';
	} else {
		btnNext.style.opacity = '1';
	}
};
checkBtns();



// footerMenuToggle
const menuButton = document.querySelectorAll('.footer_limiter_sourceFlex_item-title');
const menuLinkArea = document.querySelectorAll('.footer_limiter_sourceFlex_item-linkContainer');

function footerMenuDropDown() {
	const footerMenu = document.querySelector('.footer_limiter_sourceFlex');
	footerMenu.addEventListener('click', (show) => {
		let showTarget = show.target.dataset['footer'];
		let showTargetEl = show.target;

		switch (showTarget) {
			case "footerPortfolio":
				footerGetItems(showTarget);
				break;
			case "footerNname":
				footerGetItems(showTarget);
				break;
			case "footerNameSecond":
				footerGetItems(showTarget);
				break;
			case "footerContacts":
				footerGetItems(showTarget);
				break;
			case "footerNameThird":
				footerGetItems(showTarget);
				break;
		}

		if (showTargetEl.classList.contains('footer_limiter_sourceFlex_item-title')) {
			if (!showTargetEl.classList.contains('footer_limiter_sourceFlex_item-title__active')) {
				menuButton.forEach(el => {
					el.classList.remove('footer_limiter_sourceFlex_item-title__active');
				})
				showTargetEl.classList.add('footer_limiter_sourceFlex_item-title__active');
			} else {
				menuButton.forEach(el => {
					el.classList.remove('footer_limiter_sourceFlex_item-title__active');
				})
			}
		}
	})
}
footerMenuDropDown()

function footerGetItems(className) {
	menuLinkArea.forEach(element => {
		if (element.classList.contains(className)) {
			element.classList.toggle('footer_limiter_sourceFlex_item-linkContainer__active');
		} else {
			element.classList.remove('footer_limiter_sourceFlex_item-linkContainer__active');
		}
	})
}

