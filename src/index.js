import { CalPalView } from "./scripts/calpal-view"

document.addEventListener("DOMContentLoaded", () => {
  CalPalView.initialize();

  const welcomeModal = document.getElementById('aside');
  welcomeModal.addEventListener('click', (e) => {
    // If the user clicks on the grayed out portion outside of the modal
    if (e.currentTarget === e.target) welcomeModal.classList.add('hide');
  });

  // The modal is hidden by default, being unhidden if it's the user's first visit
  if (!localStorage.getItem('visited')) {
    welcomeModal.classList.remove('hide');
  }

  document.getElementById('close-tutorial').addEventListener('click', () => {
    welcomeModal.classList.add('hide');
  })

  document.getElementById('info-button').addEventListener('click', () => {
    welcomeModal.classList.remove('hide');
  });

  localStorage.setItem('visited', 1);
})