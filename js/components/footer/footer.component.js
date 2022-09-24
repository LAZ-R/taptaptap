import * as SERVICE_PWA from '../../services/pwa.service.js';

export const renderView = () => {
    const footer = document.getElementById('footer');

    const footerAboutLink = document.createElement('a');
    footerAboutLink.setAttribute('href', './about.html');
    footerAboutLink.setAttribute('class', 'footer-about-link');
    footerAboutLink.innerHTML = 
        `About v${SERVICE_PWA.getAppVersionNumber()}`

    footer.appendChild(footerAboutLink);
}