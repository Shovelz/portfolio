import Rellax from 'rellax';
import { PowerGlitch } from 'powerglitch';

document.addEventListener('DOMContentLoaded', () => {
  // Lazy-init Rellax and PowerGlitch
  requestIdleCallback(() => {
    new Rellax('.rellax');
    PowerGlitch.glitch('.glitch-target', {
      playMode: 'always',
      createContainers: true,
      hideOverflow: true,
      timing: {
        duration: 2000,
        iterations: Infinity,
      },
      glitchTimeSpan: {
        start: 0.5,
        end: 0.6,
      },
      shake: {
        velocity: 1,
        amplitudeX: 2,
        amplitudeY: 2,
      },
      slice: {
        count: 2,
        velocity: 5,
        minHeight: 0.02,
        maxHeight: 0.1,
        hueRotate: false,
      },
      pulse: false,
    });
  });

  const fileButtons = document.querySelectorAll('.win95-app');
  const openBtn = document.getElementById('my-files-button');
  const popup = document.getElementById('popup');
  const closeBtn = document.getElementById('closeBtn');
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;


  fileButtons.forEach((fileBtn) => {
    fileBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      fileButtons.forEach((btn) => {
        btn.classList.toggle('win95-selected', btn === fileBtn ? !btn.classList.contains('win95-selected') : false);
      });
    });
  });

  document.addEventListener('click', (e) => {
    fileButtons.forEach((fileBtn) => {
      if (!fileBtn.contains(e.target)) {
        fileBtn.classList.remove('win95-selected');
      }
    });
  });

  const showNextSlide = () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  };

  if (slides.length > 1) {
    setInterval(showNextSlide, 3000);
  }

  const closePopup = () => {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  };

  openBtn?.addEventListener('click', () => {
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
  });

  closeBtn?.addEventListener('click', closePopup);

  window.addEventListener('click', (e) => {
    if (popup.classList.contains('show') && !popup.contains(e.target) && e.target !== openBtn) {
      closePopup();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
      closePopup();
    }
  });
});
