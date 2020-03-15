window.onload = function() {
	//Header navigation
	addNavigationMenuClickHandler();

	//Slider phones background image on/off
	addVerticalPhoneHandler();
	addHorizontalPhoneHandler();

	//Slider carousel 
	addSliderControlLeftHandler();
	addSliderControlRightHandler();

	//Portfolio tags
	addPortfolioTagsHandler();

	//Portfolio images handler
	addPortfolioImageHandler();

	//Form submit 
	addSubmitButtonHandler();

	//Modal window close button
	addCloseButtonHandler();
}



const NAVIGATION_MENU = document.getElementById('navigation-list');

const addNavigationMenuClickHandler = ()=> {
	NAVIGATION_MENU.addEventListener('click', (event) => {
		console.log(event.target);
		if(event.target.parentElement.classList.contains('nav-item'))
		{
			let itemsList = NAVIGATION_MENU.querySelectorAll('li');
			let className = 'active';
			let clickedItem = event.target;
			removeClassNameFromListItems(itemsList, className);
			addClassNameToClickedItemParent(clickedItem, className);
		}
	});
}

const removeClassNameFromListItems = (itemsList, className)=> {
	itemsList.forEach(element => element.classList.remove(className));
}

const addClassNameToClickedItemParent = (clickedItem, className)=> {
	clickedItem.parentElement.classList.add(className);
}


var isVisibleVertPhone = false;
var isVisibleHorPhone = false;

const addVerticalPhoneHandler = ()=> {
	document.getElementById('phone__base__vertical').addEventListener('click', ()=> {
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
}


let items = document.querySelectorAll('.carousel .slide');
let currentItem = 0;
let isEnabled = true;

const addSliderControlLeftHandler = ()=> {
	document.querySelector('.control.left').addEventListener('click', function() {
		if (isEnabled) {
			previousItem(currentItem);
		}
	});
}

const addSliderControlRightHandler = ()=> {
	document.querySelector('.control.right').addEventListener('click', function() {
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



const PORTFOLIO_TAGS = document.querySelector('.portfolio-tags-list');

const addPortfolioTagsHandler = ()=> {
	PORTFOLIO_TAGS.addEventListener('click', (event) => {
		if(event.target.classList.contains('tag'))
		{
			let itemsList = PORTFOLIO_TAGS.querySelectorAll('.tag');
			let className = 'active';
			let clickedItem = event.target;
			removeClassNameFromListItems(itemsList, className);
			addClassNameToClickedItem(clickedItem, className);
			mixPortfolioImages();
		}
	});
}

const addClassNameToClickedItem = (clickedItem, className)=> {
	clickedItem.classList.add(className);
}


const PORTFOLIO_IMAGES = ['<span class="picture picture-1"></span>', '<span class="picture picture-2"></span>',
							'<span class="picture picture-3"></span>', '<span class="picture picture-4"></span>',
							'<span class="picture picture-5"></span>', '<span class="picture picture-6"></span>',
							'<span class="picture picture-7"></span>', '<span class="picture picture-8"></span>',
							'<span class="picture picture-9"></span>', '<span class="picture picture-10"></span>',
							'<span class="picture picture-11"></span>', '<span class="picture picture-12"></span>'];

const mixPortfolioImages = ()=> {
	var PORTFOLIO_IMAGES_COPY = [];
	let newInnerHtml = '';
	for(var i=0; i<PORTFOLIO_IMAGES.length; i++)
	{
		PORTFOLIO_IMAGES_COPY.push(PORTFOLIO_IMAGES[i]);

	}
	for(var i=0; i< PORTFOLIO_IMAGES.length; i++)
	{
		var randomNumber = Math.floor(Math.random() * PORTFOLIO_IMAGES_COPY.length);
		var randomImage = PORTFOLIO_IMAGES_COPY[randomNumber];
		PORTFOLIO_IMAGES_COPY.splice(randomNumber,1);
		newInnerHtml = newInnerHtml + randomImage;
	}
	document.getElementById('portfolio-images').innerHTML = newInnerHtml;
}




const addPortfolioImageHandler = ()=> {
	document.getElementById('portfolio-images').addEventListener('click', (event) => {
		if(event.target.classList.contains('picture'))
		{
			let imagesList = document.querySelectorAll('.picture');
			let className = 'clickedImage';
			let clickedItem = event.target;
			removeClassNameFromListItems(imagesList, className);
			addClassNameToClickedItem(clickedItem, className);
		} 
	});
}




const SUBMIT_BUTTON = document.getElementById('submit-button');
const CLOSE_BUTTON = document.getElementById('close-button');
const SUBJECT = document.getElementById('subject');
const SUBJECT_RESULT = document.getElementById('subject-result');
const DESCRIPTION_RESULT = document.getElementById('description-result');
const DESCRIPTION = document.getElementById('description');
const MESSAGE_BLOCK = document.getElementById('message-block');


const addSubmitButtonHandler = () => {
	SUBMIT_BUTTON.addEventListener('click', event => {
		createMessageSubject();
		createMessageDescription();
		MESSAGE_BLOCK.classList.remove('hidden');
		event.preventDefault();
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

const addCloseButtonHandler = () => {
	CLOSE_BUTTON.addEventListener('click', event => {
		SUBJECT_RESULT.innerText = '';
		DESCRIPTION_RESULT.innerText = '';
		MESSAGE_BLOCK.classList.add('hidden');
		event.preventDefault();
	});
}
