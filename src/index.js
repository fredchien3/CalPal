import { CalPalView } from "./scripts/calpal-view"

document.addEventListener("DOMContentLoaded", () => {
  CalPalView.initialize();
  const aside = document.getElementById('aside');
  aside.addEventListener('click', (e) => {
    if (e.currentTarget === e.target) aside.classList.add('hide');
  });
  const closeButton = document.getElementById('close-tutorial');
  closeButton.addEventListener('click', (e) => {
    aside.classList.add('hide');
  })
  document.getElementById('info-button').addEventListener('click', () => aside.classList.remove('hide'));

})