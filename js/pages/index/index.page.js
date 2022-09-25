import * as SERVICE_PWA from '../../services/pwa.service.js';
import * as SERVICE_STORAGE from '../../services/storage.service.js';
import * as UTILS from '../../services/utils.service.js';
import * as HEADER from '../../components/header/header.component.js'
import * as FOOTER from '../../components/footer/footer.component.js'

SERVICE_STORAGE.checkFirstTime();

const pageTitle = 'Tap Tap Tap';

let generatedDots = 1;
let lives = 3;
let score = 0;
let isRunning = false;
let currentMiliseconds = 1000;

let previousRandom = 0;

const lastScore = SERVICE_STORAGE.getPlayerLast();
const bestScore = SERVICE_STORAGE.getPlayerBest();

const music = new Audio('./sounds/music.mp3');

const refreshScoreDisplay = () => {
    document.getElementById('currentScore').innerHTML = score;
}

const setLivesDisplay = () => {
    const display = document.getElementById('currentLivesArea');
    display.style.webkitAnimationPlayState = "running";
    display.innerHTML = `
        <span id="life03" class="life-display ${lives < 3 ? 'life-empty' : 'life-full'}"></span>
        <span id="life02" class="life-display ${lives < 2 ? 'life-empty' : 'life-full'}"></span>
        <span id="life01" class="life-display ${lives < 1 ? 'life-empty' : 'life-full'}"></span>
    `;
    setTimeout(() => {
        display.style.webkitAnimationPlayState = "paused";
    }, 1500);
    if (lives == 0) gameOver();
}

const renderView = () => {

    SERVICE_PWA.setHTMLTitle(pageTitle);

    /* --------------------------------------------------------------------- */
    
    const scoreDisplayArea = document.createElement('div');
    scoreDisplayArea.setAttribute('id', 'scoreDisplayArea');
    scoreDisplayArea.setAttribute('class', 'page-section section1');
    scoreDisplayArea.innerHTML = `
        <div id="legacyScoresArea" class="legacy-scores-area">
            <div id="lastScoreArea" class="legacy-score-area last-score">
                <span>Last</span>
                <span id="lastScore">${lastScore} pts</span>
            </div>
            <div id="bestScoreArea" class="legacy-score-area best-score">
                <span>Best</span>
                <span id="bestScore">${bestScore} pts</span>
            </div>
        </div>
        <div id="currentScoresArea" class="current-scores-area">
            <div id="currentScoreArea" class="current-score-area">
                <span id="currentScore">0</span>
                <span>pts</span>
            </div>
            <div id="currentLivesArea" class="current-lives-area">
            </div>
        </div>
    `;
    
    document.getElementById('main').appendChild(scoreDisplayArea);

    /* --------------------------------------------------------------------- */

    const playingArea = document.createElement('div');
    playingArea.setAttribute('id', 'playingArea');
    playingArea.setAttribute('class', 'page-section section2');

    const playButton = document.createElement('button');
    playButton.setAttribute('id', 'playButton');
    playButton.setAttribute('class', 'launch-button');
    playButton.addEventListener('click', () => {
        startGame();
    })
    playButton.innerHTML = `Play`;
    playingArea.appendChild(playButton);
    document.getElementById('main').appendChild(playingArea);
}

const generateDot = (id) => {
    if (isRunning) {
        let randomPosition = UTILS.getRandomIntegerBetween(20,80);
        let randomIsBad = UTILS.getRandomIntegerBetween(0,100);
        const isGoodDot = randomIsBad < 90;
        if (id !== 1) {
            while (randomPosition < previousRandom + 15 && randomPosition > previousRandom - 15) {
                randomPosition = UTILS.getRandomIntegerBetween(20,80);
            }
        }
        previousRandom = randomPosition;
        const testDotDiv = document.createElement('div');
        testDotDiv.setAttribute('id', `testDotDiv${id}`);
        testDotDiv.setAttribute('class', 'dot-div');
        if (isGoodDot || id === 1) {
            testDotDiv.addEventListener('click', () => {
                if (isRunning ){
                    setTimeout(() => {
                        testDotDiv.remove();
                    }, 100);
                    testDotDiv.style.animation = 'pulseDot .1s';
                    testDotDiv.style.opacity = 0;
                    testDotDiv.style.backgroundColor = 'var(--gray-60)';
                    score++;
                    refreshScoreDisplay();
                }
            });
        } else {
            testDotDiv.style.backgroundColor = 'var(--bad-red)';
            testDotDiv.addEventListener('click', () => {
                if (isRunning) {
                    new Audio('./sounds/wrongDot.mp3').play();
                    setTimeout(() => {
                        testDotDiv.remove();
                    }, 100);
                    testDotDiv.style.animation = 'pulseDot .1s';
                    testDotDiv.style.opacity = 0;
                    testDotDiv.style.backgroundColor = 'var(--gray-60)';
                    score--;
                    refreshScoreDisplay();
                    lives--;
                    setLivesDisplay();
                }
            });
        }
        
        document.getElementById('playingArea').appendChild(testDotDiv);

        testDotDiv.style.opacity = 0;
        testDotDiv.style.position = 'fixed';
        testDotDiv.style.left = `${randomPosition}%`;
        testDotDiv.style.transition = 'opacity .1s linear, bottom 3s linear';
        testDotDiv.style.bottom = '65%';
        setTimeout(() => {
            testDotDiv.style.opacity = 100;
            testDotDiv.style.bottom = 'var(--footer-height)';        
        }, 20);

        setTimeout(() => {
            if (isRunning) {
                if (isGoodDot) {
                    if (document.getElementById(`testDotDiv${id}`) !== null) {
                        gameOver();
                    }
                } else {
                    setTimeout(() => {
                        testDotDiv.remove();
                    }, 100);
                    testDotDiv.style.animation = 'disappearDot .25s';
                    testDotDiv.style.opacity = 0;
                    testDotDiv.style.backgroundColor = 'var(--gray-60)';
                    score++;
                    refreshScoreDisplay();
                }
            }
        }, 3000);
    }
}

const generateDotEach = (i, miliseconds) => {
    if (isRunning) {
        setTimeout(() => {
            generateDot(i);
            i++;
            generatedDots = i;
            if (miliseconds >= 750) { // entre 1000 et 750
                miliseconds = miliseconds - 12;
            } else if (miliseconds >= 500) { // entre 750 et 500
                miliseconds = miliseconds - 6;
            } else if (miliseconds >= 250) { // entre 500 et 250
                miliseconds = miliseconds - 2;
            } else if (miliseconds >= 150) { // entre 250 et 250
                miliseconds = miliseconds - .5;
            } else if (miliseconds < 150) { // en dessous de 150
                miliseconds = miliseconds - .1;
            } 
            currentMiliseconds = miliseconds;
            generateDotEach(i, miliseconds);
        }, miliseconds);
    }
}

const startGame = () => {
    document.getElementById('playButton').style.opacity = 0;
    new Audio('./sounds/start.mp3').play();
    setTimeout(() => {
        music.play();
        music.volume = 0.75;
        music.loop = true;
    }, 1000);
    setLivesDisplay();
    setTimeout(() => {
        document.getElementById('playingArea').innerHTML = '';
        document.getElementById('playingArea').style.justifyContent = 'flex-start';
        isRunning = true;
        generateDotEach(generatedDots, currentMiliseconds, '#00FF08');
    }, 200);
}

const gameOver = () => {
    isRunning = false;
    document.getElementById('playingArea').remove();

    const gameOverArea = document.createElement('div');
    gameOverArea.setAttribute('id', 'gameOverArea');
    gameOverArea.setAttribute('class', 'page-section section3');
    gameOverArea.innerHTML = `
        <span id="gameOverText" class="game-over">GAME<br>OVER</span><br>
        <span id="milisecondsText">${UTILS.roundTo(currentMiliseconds, 2)} ms</span><br>
        <button id="retryButton" class="retry-button">Retry</a>
    `;
    document.getElementById('main').appendChild(gameOverArea);

    new Audio('./sounds/end.mp3').play();
    music.pause();
    
    SERVICE_STORAGE.setPlayerLast(score);
    if (score > bestScore) {
        document.getElementById('currentScore').style.animation = 'flash .5s linear infinite';
    }

    setTimeout(() => {
        document.getElementById('gameOverText').style.opacity = '100%';
    }, 100);
    setTimeout(() => {
        document.getElementById('milisecondsText').style.opacity = '100%';
    }, 1000);
    setTimeout(() => {
        document.getElementById('retryButton').style.opacity = '100%';
        setTimeout(() => {
            document.getElementById('retryButton').addEventListener('click', () => { window.location = './' });
        }, 700);
    }, 2500);
}

HEADER.renderView();
renderView();
FOOTER.renderView();
SERVICE_PWA.setViewportSize();

