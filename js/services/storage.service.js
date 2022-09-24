export const STORAGE = localStorage;

export const checkFirstTime = () => {
    let firstTime = STORAGE.getItem('tapTapTapFirstTime');

    if (firstTime === null) {
        STORAGE.setItem('tapTapTapFirstTime', '0');
        let playerTMP = {
            last : 0,
            best : 0
        };
        STORAGE.setItem('tapTapTapPlayer', JSON.stringify(playerTMP));
    }
}
/* ------------------------------------------------------------------------- */
export const getPlayerLast = () => {
    const PLAYER = JSON.parse(STORAGE.getItem('tapTapTapPlayer'));
    return PLAYER.last;
}

export const setPlayerLast = (score) => {
    let PLAYER = JSON.parse(STORAGE.getItem('tapTapTapPlayer'));
    PLAYER.last = score;
    if (score > PLAYER.best) PLAYER.best = score;
    STORAGE.setItem('tapTapTapPlayer', JSON.stringify(PLAYER));
}
/* ------------------------------------------------------------------------- */
export const getPlayerBest = () => {
    const PLAYER = JSON.parse(STORAGE.getItem('tapTapTapPlayer'));
    return PLAYER.best;
}
