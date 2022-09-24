import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Test CSS';

const renderView = () => {

    SERVICE_PWA.setHTMLTitle(pageTitle);
    
    const topPart = document.createElement('div');
    topPart.setAttribute('id', 'topPart');
    topPart.setAttribute('class', 'about-category top-part');
    topPart.innerHTML =
    `<div class="about-sub-category about-app-infos">
        <span class="about-sub-category about-app-name">Tap Tap Tap</span>
        <span class="about-sub-category about-app-version">v${SERVICE_PWA.getAppVersionNumber()}</span>
    </div>`;
    
    document.getElementById('main').appendChild(topPart);

    const middlePart = document.createElement('div');
    middlePart.setAttribute('id', 'middlePart');
    middlePart.setAttribute('class', 'about-category middle-part');
    middlePart.innerHTML =
    `<div class="about-sub-category about-warning">
        <span>Warning</span>
    </div>
    <div class="about-sub-category about-warning-text">
        <p>It is important to notice than this app uses your device local storage to persist data.<br>
        All this app data will be lost if you clean your cache.</p>
    </div>`;
    
    document.getElementById('main').appendChild(middlePart);

    const bottomPart = document.createElement('div');
    bottomPart.setAttribute('id', 'bottomPart');
    bottomPart.setAttribute('class', 'about-category bottom-part');
    bottomPart.innerHTML =
        `<div class="about-sub-category lazr-card">
            <span>made by</span>
            <img class="lazr-logo" src="https://laz-r.github.io/icon-512.webp"/>
        </div>
        <div class="about-sub-category links-card">
            <a class="about-link" href="https://laz-r.github.io/">laz-r.github.io</a>
            <a class="about-link" href="https://github.com/LAZ-R"><img class="github-logo" src="https://png.monster/wp-content/uploads/2022/02/png.monster-703.png"/></a>
        </div>
        `;
    
    document.getElementById('main').appendChild(bottomPart);
}
HEADER.renderView();
renderView();
FOOTER.renderView();