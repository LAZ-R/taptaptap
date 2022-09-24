import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Test CSS';

const renderView = () => {

    SERVICE_PWA.setHTMLTitle(pageTitle);
    
    const topHalf = document.createElement('div');
    topHalf.setAttribute('id', 'topHalf');
    topHalf.setAttribute('class', 'fiftyPercent topHalf');
    topHalf.appendChild(document.createElement('span')).innerHTML =
    `About content<br>
    top half<br>
    v${SERVICE_PWA.getAppVersionNumber()}`;
    
    document.getElementById('main').appendChild(topHalf);

    const bottomHalf = document.createElement('div');
    bottomHalf.setAttribute('id', 'bottomHalf');
    bottomHalf.setAttribute('class', 'fiftyPercent bottomHalf');
    bottomHalf.appendChild(document.createElement('span')).innerHTML =
        `About content<br>
        bottom half<br>
        v${SERVICE_PWA.getAppVersionNumber()}`;
    
    document.getElementById('main').appendChild(bottomHalf);
}
HEADER.renderView();
renderView();
FOOTER.renderView();