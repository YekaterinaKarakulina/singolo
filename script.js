window.onload = function() {
	
	let swipeElement = document.querySelector('.carousel');

	//Header navigation onload behavior
	const currentPos = window.scrollY;
	const divs = document.querySelectorAll('.wrapper');
	const links = document.querySelectorAll('#navigation a');

	divs.forEach((element) => {
		if((element.offsetTop - 95) <= currentPos && (element.offsetTop + element.offsetHeight - 95) > currentPos) {
			links.forEach((link) => {
				link.classList.remove('active');
				if((element.firstElementChild.getAttribute('id')) === link.getAttribute('href').substring(1)) {
					link.classList.add('active');
				}
			})
		}
	})

	//Hamburger menu
	addHamburgerHandler();
	
	//Header navigation
	addNavigationMenuClickHandler();

	//Slider phones background image on/off
	addVerticalPhoneHandler();
	addHorizontalPhoneHandler();

	//Slider carousel 
	addSliderControlLeftHandler();
	addSliderControlRightHandler();

	//Swiper carousel
	swipeDetect(swipeElement);

	//Portfolio tags
	addPortfolioTagsHandler();

	//Portfolio images handler
	addPortfolioImageHandler();

	//Form submit 
	addSubmitButtonHandler();

	//Modal window close button
	addCloseButtonHandler();
}

/*-----Header navigation-----*/
const addNavigationMenuClickHandler = ()=> {
	document.addEventListener('scroll', ()=> {
		const currentPos = window.scrollY;
		const divs = document.querySelectorAll('.wrapper');
		const links = document.querySelectorAll('#navigation a');

		divs.forEach((element) => {
			if((element.offsetTop - 97) <= currentPos && (element.offsetTop + element.offsetHeight - 97) > currentPos) {
				links.forEach((link) => {
					link.classList.remove('active');
					if((element.firstElementChild.getAttribute('id')) === link.getAttribute('href').substring(1)) {
						link.classList.add('active');
					}
				})
			}
		})
	});

	const navigation = document.querySelector('.hamburger__navigation');
	
	navigation.addEventListener('click', (event) => {
		if(event.target.parentElement.classList.contains('nav-item')) {
			navigation.querySelectorAll('li').forEach(element => element.classList.remove('active'));
			document.querySelector('.hamburger-container').classList.add('hidden');
			document.querySelector('.hamburger').classList.remove('hamburger_open');
			document.querySelector('.logo').classList.remove('center');
			isHamburgerOpen = false;
			event.target.parentElement.classList.add('active');
		}
	});
	
}

/*-----Slider phones background image on/off-----*/
let isVisibleVertPhone = false;
let isVisibleHorPhone = false;

const addVerticalPhoneHandler = ()=> {
	document.getElementById('phone__base__vertical').addEventListener('click', ()=> {
		if(isVisibleVertPhone) {
			document.getElementById('phone__background__vertical').classList.remove('hidden');
		} else {
			document.getElementById('phone__background__vertical').classList.add('hidden');
		}
		isVisibleVertPhone = !isVisibleVertPhone;
	});

	document.getElementById('phone__base__vertical').addEventListener('touchstart', ()=> {
		if(isVisibleVertPhone) {
			document.getElementById('phone__background__vertical').classList.remove('hidden');
		} else {
			document.getElementById('phone__background__vertical').classList.add('hidden');
		}
		isVisibleVertPhone = !isVisibleVertPhone;
	});
}

const addHorizontalPhoneHandler = ()=> {
	document.getElementById('phone__base__horizontal').addEventListener('click', ()=> {
		if(isVisibleHorPhone) {
			document.getElementById('phone__background__horizontal').classList.remove('hidden');
		} else {
			document.getElementById('phone__background__horizontal').classList.add('hidden');
		}
		isVisibleHorPhone = !isVisibleHorPhone;
	});

	document.getElementById('phone__base__horizontal').addEventListener('touchstart', ()=> {
		if(isVisibleHorPhone) {
			document.getElementById('phone__background__horizontal').classList.remove('hidden');
		} else {
			document.getElementById('phone__background__horizontal').classList.add('hidden');
		}
		isVisibleHorPhone = !isVisibleHorPhone;
	});
}

/*-----Slider carousel-----*/
let items = document.querySelectorAll('.carousel .slide');
let currentItem = 0;
let isEnabled = true;

const addSliderControlLeftHandler = ()=> {
	document.querySelector('.arrow.left').addEventListener('click', function() {
		if (isEnabled) {
			previousItem(currentItem);
		}
	});
}

const addSliderControlRightHandler = ()=> {
	document.querySelector('.arrow.right').addEventListener('click', function() {
		if (isEnabled) { 
			nextItem(currentItem);
		}
	});
}

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('current', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('current');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

/*-----Swiper carousel-----*/
const swipeDetect = (el) => {
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;

	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e) {
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	});

	surface.addEventListener('mouseup', function(e) {
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;

		if(elapsedTime <= allowedTime) {
			if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				if(distX>0) {
					if(isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if(isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	});

	surface.addEventListener('touchstart', function(e) {
		let touchObject = e.changedTouches[0];
		startX = touchObject.pageX;
		startY = touchObject.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	});

	surface.addEventListener('touchmove', function(e) {
		e.preventDefault();
	});

	surface.addEventListener('touchend', function(e) {
		let touchObject = e.changedTouches[0];
		distX = touchObject.pageX - startX;
		distY = touchObject.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;

		if(elapsedTime <= allowedTime) {
			if(Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				if(distX>0) {
					if(isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if(isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	});
}

/*-----Portfolio tags-----*/
const PORTFOLIO_TAGS = document.querySelector('.portfolio__tags-list');
let previousClickedImage = '';
let clickedImage = '';
let borderBlock = '<span class="image_border"></span>';

const addPortfolioTagsHandler = ()=> {
	PORTFOLIO_TAGS.addEventListener('click', (event) => {
		if(event.target.classList.contains('tag')) {
			PORTFOLIO_TAGS.querySelectorAll('.tag').forEach(element => element.classList.remove('active'));
			event.target.classList.add('active');
			mixPortfolioImages();
		}
	});
}


const mixPortfolioImages = ()=> {
	var portfolio_images_collection = document.querySelectorAll('.picture');
	var PORTFOLIO_IMAGES = [];
	for(var i=0; i<portfolio_images_collection .length; i++) {
		PORTFOLIO_IMAGES.push(portfolio_images_collection[i]); 
	}
	document.getElementById('portfolio__images').innerHTML = '';
	for(var i=0; i< portfolio_images_collection.length; i++) {
		var randomNumber = Math.floor(Math.random() * PORTFOLIO_IMAGES.length);
		var randomImage = PORTFOLIO_IMAGES[randomNumber];
		PORTFOLIO_IMAGES.splice(randomNumber,1);
		document.getElementById('portfolio__images').append(randomImage);
	}
}

/*-----Portfolio images handler-----*/
const addPortfolioImageHandler = ()=> {
	document.getElementById('portfolio__images').addEventListener('click', (event) => {
		if(event.target.classList.contains('picture')) {
			previousClickedImage = clickedImage;
			previousClickedImage.innerHTML = '';
			clickedImage = event.target;
			clickedImage.innerHTML = borderBlock;
		} 
	});
}

/*-----Form submit-----*/
const SUBMIT_BUTTON = document.getElementById('submit-button');
const CLOSE_BUTTON = document.getElementById('close-button');
const SUBJECT = document.getElementById('subject');
const SUBJECT_RESULT = document.getElementById('subject-result');
const DESCRIPTION_RESULT = document.getElementById('description-result');
const DESCRIPTION = document.getElementById('description');
const MESSAGE_BLOCK = document.getElementById('message-block');
const INPUT_NAME = document.querySelector('.input__name');
const INPUT_EMAIL = document.querySelector('.input__email');

const addSubmitButtonHandler = () => {
	SUBMIT_BUTTON.addEventListener('click', event => {
		var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(INPUT_NAME.value == ''){
			alert('Введите корректное имя');
			event.preventDefault();
			return false;
		} else if(regex.test(INPUT_EMAIL.value)==false) {
			alert('Введите корректный e-mail');
			event.preventDefault();
			return false;
		} else {
			createMessageSubject();
			createMessageDescription();
			MESSAGE_BLOCK.classList.remove('hidden');
			event.preventDefault();
		}
	});
}

const createMessageSubject = ()=> {
	if(SUBJECT.value.toString() == '') {
		SUBJECT_RESULT.innerText = "Без темы";
	} else {
		SUBJECT_RESULT.innerText = 'Тема: ' + SUBJECT.value.toString();
	}
}

const createMessageDescription = ()=> {
	if(DESCRIPTION.value.toString() == '') {
		DESCRIPTION_RESULT.innerText = "Без описания";
	} else {
		DESCRIPTION_RESULT.innerText = 'Описание: ' + DESCRIPTION.value.toString();
	}
}

/*-----Modal window close button-----*/
const addCloseButtonHandler = () => {
	CLOSE_BUTTON.addEventListener('click', event => {
		SUBJECT_RESULT.innerText = '';
		DESCRIPTION_RESULT.innerText = '';
		MESSAGE_BLOCK.classList.add('hidden');
		document.getElementById('form').reset();
		event.preventDefault();
	});
}







/*-----Hamburger menu-----*/
const HAMBURGER = document.querySelector('.header__hamburger');
var isHamburgerOpen = false;

const addHamburgerHandler = ()=> {
	HAMBURGER.addEventListener('click', (event) => {
		if(isHamburgerOpen){
			document.querySelector('.hamburger').classList.remove('hamburger_open');
			document.querySelector('.hamburger__menu').style.display = 'none';
			document.querySelector('.hamburger-container').classList.add('hidden');
			document.querySelector('.logo').classList.remove('center');
		} else {
			currentViewWidth = window.innerWidth;
			document.querySelector('.hamburger').classList.add('hamburger_open');
			document.querySelector('.hamburger__menu').style.display = 'inline-block';
			document.querySelector('.hamburger-container').classList.remove('hidden')
			document.querySelector('.logo').classList.add('center');
		}
		viewWidth = currentViewWidth;
		isHamburgerOpen = !isHamburgerOpen;
	});
}