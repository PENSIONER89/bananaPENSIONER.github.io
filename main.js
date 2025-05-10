const section = document.querySelector('.section2');
const image = document.querySelector('.rotating-image.original');
const killButton = document.querySelector('.kill-button');

let cloningInterval;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      image.classList.add('active');

      if (!cloningInterval) {
        cloningInterval = setInterval(() => {
          const clone = image.cloneNode(true);
          clone.classList.remove('original');  // Удаляем класс оригинала
          clone.classList.add('clone');        // Добавляем класс клона
          section.appendChild(clone);
        }, 3000);
      }
    } else {
      if (cloningInterval) {
        clearInterval(cloningInterval);
        cloningInterval = null;
      }
    }
  });
}, { threshold: 0.5 });

observer.observe(section);

// Кнопка "Убить всех"
killButton.addEventListener('click', () => {
  const clones = document.querySelectorAll('.rotating-image.clone');
  clones.forEach(clone => clone.remove());
});
const killOrigButton = document.querySelector('.kill-button-orig');

killOrigButton.addEventListener('click', () => {
  const original = document.querySelector('.rotating-image.original');
  if (original) {
    original.remove();
    
    // Остановить спавн
    if (cloningInterval) {
      clearInterval(cloningInterval);
      cloningInterval = null;
    }
  }
});
