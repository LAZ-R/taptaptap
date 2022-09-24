import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as UTILS from '../../services/utils.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

const pageTitle = 'Tap Tap Tap';

let generatedDots = 1;
let score = 0;
let isRunning = true;

var audio = new Audio('./sounds/tap.wav');

const refreshScoreDisplay = () => {
    document.getElementById('scoreDisplayArea').innerHTML = score;
}

const renderView = () => {

    SERVICE_PWA.setHTMLTitle(pageTitle);

    /* --------------------------------------------------------------------- */
    
    const scoreDisplayArea = document.createElement('div');
    scoreDisplayArea.setAttribute('id', 'scoreDisplayArea');
    scoreDisplayArea.setAttribute('class', 'page-section section1');
    scoreDisplayArea.innerHTML = `0`;
    
    document.getElementById('main').appendChild(scoreDisplayArea);

    /* --------------------------------------------------------------------- */

    const playingArea = document.createElement('div');
    playingArea.setAttribute('id', 'playingArea');
    playingArea.setAttribute('class', 'page-section section2');
    playingArea.innerHTML = ``;
    document.getElementById('main').appendChild(playingArea);
}

const generateDot = (id, colorHexCode) => {
    const testDotDiv = document.createElement('div');
    testDotDiv.setAttribute('id', `testDotDiv${id}`);
    testDotDiv.setAttribute('class', 'dot-div');
    testDotDiv.style.backgroundColor = `${colorHexCode}`;
    testDotDiv.addEventListener('click', () => {
        audio.play();
        testDotDiv.style.opacity = 0;
        setTimeout(() => {
            testDotDiv.remove();
        }, 200);
        score++;
        refreshScoreDisplay();
    })
    document.getElementById('playingArea').appendChild(testDotDiv);
    testDotDiv.style.opacity = 0;
    testDotDiv.style.position = 'fixed';
    testDotDiv.style.left = `${UTILS.getRandomIntegerBetween(15,85)}%`;
    testDotDiv.style.transition = 'opacity .2s linear, bottom 3.5s linear';
    testDotDiv.style.bottom = '67%';
    setTimeout(() => {
        testDotDiv.style.opacity = 100;
        testDotDiv.style.bottom = 'var(--footer-height)';        
    }, 20);

    setTimeout(() => {
        if (document.getElementById(`testDotDiv${id}`) !== null) {gameOver()}
    }, 3500);
}

const gameOver = () => {
    console.log('game over');
    isRunning = false;
    document.getElementById('playingArea').innerHTML = '';
    document.getElementById('playingArea').remove();

    const gameOverArea = document.createElement('div');
    gameOverArea.setAttribute('id', 'gameOverArea');
    gameOverArea.setAttribute('class', 'page-section section3');
    gameOverArea.innerHTML = `<span class="game-over">GAME OVER</span><br><a href="./" class="retry-link">Retry</a>`;
    document.getElementById('main').appendChild(gameOverArea);
}

const generateDotEach = (i, miliseconds, hexCode) => {
    if (isRunning) {
        setTimeout(() => {
            generateDot(i, hexCode);
            i++;
            generatedDots = i;
            if (miliseconds >= 1000) { // 1000 +
                miliseconds = miliseconds - 12;
            } else if (miliseconds >= 750) { // entre 1000 et 750
                hexCode = '#FFFF00';
                miliseconds = miliseconds - 8;
            } else if (miliseconds >= 500) { // entre 750 et 500
                hexCode = '#FFA200';
                miliseconds = miliseconds - 4;
            } else if (miliseconds >= 250) { // entre 500 et 250
                hexCode = '#FF0000';
                miliseconds = miliseconds - 2;
            }
            generateDotEach(i, miliseconds, hexCode);
        }, miliseconds);
    }
}

HEADER.renderView();
renderView();
FOOTER.renderView();
SERVICE_PWA.setViewportSize();

generateDotEach(generatedDots, 1250, '#00FF08');
