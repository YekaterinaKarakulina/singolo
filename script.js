const navigation = document.getElementById('navigation-list');

navigation.addEventListener('click', (event) => {
    navigation.querySelectorAll('li').forEach(element => element.classList.remove('active'));
    console.log(event.target);
    console.log(event.target.parentElement);
    event.target.parentElement.classList.add('active');
});