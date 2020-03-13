const navigation = document.getElementById('navigation-list');

navigation.addEventListener('click', (event) => {
    navigation.querySelectorAll('li').forEach(element => element.classList.remove('active'));
    event.target.parentElement.classList.add('active');
});


const phone__base__vertical = document.getElementById('phone__base__vertical');
const phone__background__vertical = document.getElementById('phone__background__vertical');
const phone__base__horizontal = document.getElementById('phone__base__horizontal');
const phone__background__horizontal = document.getElementById('phone__background__horizontal');
var isVisibleVertPhone = false;
var isVisibleHorPhone = false;

phone__base__vertical.addEventListener('click', ()=> {
    if(isVisibleVertPhone) {
        phone__background__vertical.classList.remove('hidden');
    } else {
        phone__background__vertical.classList.add('hidden');
    }
    isVisibleVertPhone = !isVisibleVertPhone;
});

phone__base__horizontal.addEventListener('click', ()=> {
    if(isVisibleHorPhone) {
        phone__background__horizontal.classList.remove('hidden');
    } else {
        phone__background__horizontal.classList.add('hidden');
    }
    isVisibleHorPhone = !isVisibleHorPhone;
});


let items = document.querySelectorAll('.carousel .slide');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
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

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});
