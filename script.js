window.onload = function() {
	console.log('hello');

	//Header navigation
	addNavigationMenuClickHandler();

	//Slider phones background image on/off
	addVerticalPhoneHandler();
	addHorizontalPhoneHandler();

	//Slider carousel 
	addSliderControlLeftHandler();
	addSliderControlRightHandler();

}



const NAVIGATION = document.getElementById('navigation-list');

const addNavigationMenuClickHandler = ()=> {
	NAVIGATION.addEventListener('click', (event) => {
		NAVIGATION.querySelectorAll('li').forEach(element => element.classList.remove('active'));
		event.target.parentElement.classList.add('active');
	});
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






/*
const SUBMIT_BUTTON = document.getElementById('submit-button');
const CLOSE_BUTTON = document.getElementById('close-button');


SUBMIT_BUTTON.addEventListener('click', e => {
	const subject = document.getElementById('subject').value.toString();
	const description = document.getElementById('description').value.toString();
	if(subject == '') {
		document.getElementById('subject-result').innerText = "Без темы";
	} else {
		document.getElementById('subject-result').innerText = 'Тема: ' + subject;
	}
	if(description == '')
	{
		document.getElementById('description-result').innerText = "Без описания";
	} else {
		document.getElementById('description-result').innerText = 'Описание: ' + description;
	}
	
	document.getElementById('message-block').classList.remove('hidden');
	e.preventDefault();
});

CLOSE_BUTTON.addEventListener('click', ()=> {
	document.getElementById('subject-result').innerText = '';
	document.getElementById('description-result').innerText = '';
	document.getElementById('message-block').classList.add('hidden');
});

*/