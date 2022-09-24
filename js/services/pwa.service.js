import { VERSION_NUMBER, MAX_SCREEN_SIZE } from "../data/pwa.data.js";

export const setViewportSize = () => {
  const setDocumentHeight = () => {
    document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', setDocumentHeight);
  setDocumentHeight();
}

export const setHTMLTitle = (pageTitle) => {
  const title = document.getElementById('title');
  title.innerHTML = pageTitle;

  const appleTitle = document.getElementById('appleTitle');
  appleTitle.setAttribute('content', pageTitle);
}

export const getAppVersionNumber = () => {
  return VERSION_NUMBER;
}

/* Breakpoints */
export const isPhone = window.innerWidth <= MAX_SCREEN_SIZE.Phone
export const isTablet = window.innerWidth > MAX_SCREEN_SIZE.Phone && window.innerWidth <= MAX_SCREEN_SIZE.Tablet
export const isTabletOrUp = window.innerWidth > MAX_SCREEN_SIZE.Phone
export const isLaptop = window.innerWidth > MAX_SCREEN_SIZE.Tablet && window.innerWidth <= MAX_SCREEN_SIZE.Laptop
export const isLaptopOrUp = window.innerWidth > MAX_SCREEN_SIZE.Tablet
export const isDesktop = window.innerWidth > MAX_SCREEN_SIZE.Laptop