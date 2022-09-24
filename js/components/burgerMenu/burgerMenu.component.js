import * as SERVICE_PWA from '../../services/pwa.service.js';

let isMenuVisible = false;

export const renderView = () => {
    const headerBurgerMenuButton = document.createElement('button');
    headerBurgerMenuButton.setAttribute('id', 'headerBurgerMenuButton');
    headerBurgerMenuButton.setAttribute('class', 'header-burger-menu-button');
    headerBurgerMenuButton.innerHTML =
        '☰'
    headerBurgerMenuButton.addEventListener('click', () => {
        if (isMenuVisible) {
            closeMenu();
            isMenuVisible = false;
        } else {
            openMenu();
            isMenuVisible = true;
        }
    });

    document.getElementById('header').appendChild(headerBurgerMenuButton);

    const burgerMenuBackground = document.createElement('div');
    burgerMenuBackground.setAttribute('id', 'burgerMenuBackground');
    burgerMenuBackground.setAttribute('class', 'burger-menu-background');
    burgerMenuBackground.addEventListener('click', () => {
        if (isMenuVisible) {
            closeMenu();
            isMenuVisible = false;
        }
    });

    document.getElementById('body').appendChild(burgerMenuBackground);

    const burgerMenu = document.createElement('div');
    burgerMenu.setAttribute('id', 'burgerMenu');
    burgerMenu.setAttribute('class', 'burger-menu');
    burgerMenu.innerHTML = `
    <a href="./" class="burger-menu-link">Home</a>
    <a href="./about.html" class="burger-menu-link">About</a>
    `;

    document.getElementById('body').appendChild(burgerMenu);
}

export const closeMenu = () => {
    document.getElementById('burgerMenuBackground').style.opacity = '0%';
    document.getElementById('headerBurgerMenuButton').innerHTML = '☰';
    SERVICE_PWA.isTablet ? document.getElementById('burgerMenu').style.right = '-40%' : document.getElementById('burgerMenu').style.right = '-60%';
    setTimeout(() => {
        document.getElementById('burgerMenuBackground').style.display = 'none';
    }, 200);
}
export const openMenu = () => {
    document.getElementById('burgerMenuBackground').style.display = 'flex';
    document.getElementById('headerBurgerMenuButton').innerHTML = '☒';
    document.getElementById('burgerMenu').style.right = 0;
    setTimeout(() => {
        document.getElementById('burgerMenuBackground').style.opacity = '50%';
    }, 10);
}