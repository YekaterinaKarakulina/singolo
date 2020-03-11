const navigation = document.getElementById('navigation-list');

navigation.addEventListener('click', (event) => {
    navigation.querySelectorAll('li').forEach(element => element.classList.remove('active'));
    event.target.parentElement.classList.add('active');
});


const phone__base__vertical = document.getElementById('phone__base__vertical');
const phone__background__vertical = document.getElementById('phone__background__vertical');
const phone__base__horizontal = document.getElementById('phone__base__horizontal');
const phone__background__horizontal = document.getElementById('phone__background__horizontal');
var flag_phone_vertical = false;
var flag_phone_horizontal = false;

phone__base__vertical.addEventListener('click', ()=> {
    if(flag_phone_vertical) {
        phone__background__vertical.classList.remove('hidden');
        flag_phone_vertical = false;
    } else {
        phone__background__vertical.classList.add('hidden');
        flag_phone_vertical = true;
    }
});

phone__base__horizontal.addEventListener('click', ()=> {
    if(flag_phone_horizontal) {
        phone__background__horizontal.classList.remove('hidden');
        flag_phone_horizontal = false;
    } else {
        phone__background__horizontal.classList.add('hidden');
        flag_phone_horizontal = true;
    }
});


const arrow_left = document.getElementById('arrow-left');
const arrow_right = document.getElementById('arrow-right');
var slider_flag = true;
arrow_left.addEventListener('click', (event) => {
    if(slider_flag) {
        event.target.parentElement.classList.add('switch');
        event.target.parentElement.querySelector('.slide1').classList.add('hidden');
        slider_flag = false;
    } else {
        event.target.parentElement.classList.remove('switch');
        event.target.parentElement.querySelector('.slide1').classList.remove('hidden');
        slider_flag = true;
    }
});

arrow_right.addEventListener('click', (event) => {
    if(slider_flag) {
        event.target.parentElement.classList.add('switch');
        event.target.parentElement.querySelector('.slide1').classList.add('hidden');
        slider_flag = false;
    } else {
        event.target.parentElement.classList.remove('switch');
        event.target.parentElement.querySelector('.slide1').classList.remove('hidden');
        slider_flag = true;
    }
});



