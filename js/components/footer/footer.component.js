import * as SERVICE_PWA from '../../services/pwa.service.js';
const year = new Date().getFullYear();
export const renderView = () => {
    document.getElementById('footer').innerHTML =
    `&copy; ${year} - v${SERVICE_PWA.getAppVersionNumber()} - <a href="./about.html">About</a>`;
}