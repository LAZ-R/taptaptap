import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as COMP_BURGER from '../burgerMenu/burgerMenu.component.js';

export const renderView = () => {
    const header = document.getElementById('header');

    const headerIndexLink = document.createElement('a');
    headerIndexLink.setAttribute('href', './');
    headerIndexLink.setAttribute('class', 'header-index-link');

    const headerLogo = document.createElement('img');
    headerLogo.setAttribute('src', './images/logo-white.svg');
    headerLogo.setAttribute('alt', 'lazr logo');
    headerLogo.setAttribute('class', 'header-logo');
    headerLogo.addEventListener('click', () => {
        window.location = './';
    });

    headerIndexLink.appendChild(headerLogo);
    header.appendChild(headerIndexLink);

    if (SERVICE_PWA.isPhone || SERVICE_PWA.isTablet) {
        COMP_BURGER.renderView();
    } else {
        const headerLinksGroup = document.createElement('div');
        headerLinksGroup.setAttribute('id', 'headerLinksGroup');
        headerLinksGroup.setAttribute('class', 'header-links-group');
        headerLinksGroup.innerHTML = `
        <a href="./" class="header-link">Home</a>
        <a href="./about.html" class="header-link">About</a>
        `;

        header.appendChild(headerLinksGroup);
    }
}