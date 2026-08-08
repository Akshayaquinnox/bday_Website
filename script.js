window.addEventListener('DOMContentLoaded', () => {
  const toCakeBtn = document.getElementById('toCakeBtn');
  const candle = document.getElementById('candle');
  const confettiContainer = document.getElementById('confettiContainer');
  const afterMessage = document.getElementById('afterMessage');

  if (toCakeBtn) {
    toCakeBtn.addEventListener('click', () => {
      showScreen('step4');
    });
  }

  if (candle) {
    candle.addEventListener('click', () => {
      confetti();
      candle.disabled = true;
      candle.textContent = 'Wish made!';

      if (afterMessage) {
        setTimeout(() => {
          afterMessage.classList.add('show');
        }, 600);
      }
    });
  }

  if (confettiContainer) {
    const staticPieces = [
      { left: '5%', delay: '0s', duration: '7s' },
      { left: '18%', delay: '0.6s', duration: '6.5s' },
      { left: '33%', delay: '1.1s', duration: '6.8s' },
      { left: '52%', delay: '0.3s', duration: '7.2s' },
      { left: '71%', delay: '0.9s', duration: '6.3s' },
      { left: '86%', delay: '0.2s', duration: '6.7s' }
    ];

    staticPieces.forEach(({ left, delay, duration }) => {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece confetti-bg';
      piece.style.left = left;
      piece.style.top = '-28px';
      piece.style.width = `${8 + Math.random() * 6}px`;
      piece.style.height = `${12 + Math.random() * 10}px`;
      piece.style.background = ['#ffd1dc', '#fff1a8', '#b0f0ff', '#d8b4ff', '#ffb6c1'][Math.floor(Math.random() * 5)];
      piece.style.animationDelay = delay;
      piece.style.animationDuration = duration;
      confettiContainer.appendChild(piece);
    });
  }
});

function confetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;

  for (let i = 0; i < 24; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece confetti-burst';
    const size = 6 + Math.random() * 8;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.6}px`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = '-28px';
    piece.style.background = [
      '#ffd1dc', '#fff1a8', '#b0f0ff', '#d8b4ff', '#ffb6c1'
    ][Math.floor(Math.random() * 5)];
    piece.style.animationDuration = `${3 + Math.random() * 1.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

    
    const screens = {
        step1: document.getElementById('step1'),
        step1b: document.getElementById('step1b'),
        step2: document.getElementById('step2'),
        step3: document.getElementById('step3'),
        step4: document.getElementById('step4')
    };

    const softMessage = document.getElementById('softMessage');
    const popupText = document.getElementById('popupText');
    const balloonField = document.querySelector('.balloon-field');
    const balloons = Array.from(document.querySelectorAll('.balloon'));
    const cards = Array.from(document.querySelectorAll('.card'));

    function showScreen(name) {
        Object.values(screens).forEach((screen) => screen.classList.remove('active'));
        screens[name].classList.add('active');
    }

    document.getElementById('yesBtn').addEventListener('click', () => {
        showScreen('step2');
        startBalloonScene();
    });

    document.getElementById('noBtn').addEventListener('click', () => {
        showScreen('step1b');
    });

    document.getElementById('goBackBtn').addEventListener('click', () => {
        showScreen('step1');
    });

    function startBalloonScene() {
        let poppedCount = 0;
        balloons.forEach((balloon) => {
            balloon.addEventListener('click', () => {
                if (balloon.classList.contains('popped')) return;

                balloon.classList.add('popped');
                poppedCount += 1;

                const word = balloon.getAttribute('data-word');
                popupText.textContent = word;

                const balloonRect = balloon.getBoundingClientRect();
                const fieldRect = balloonField.getBoundingClientRect();
                popupText.style.left = `${balloonRect.left - fieldRect.left + balloonRect.width / 2}px`;
                popupText.style.top = `${balloonRect.top - fieldRect.top + balloonRect.height / 2}px`;

                popupText.classList.remove('show');
                void popupText.offsetWidth;
                popupText.classList.add('show');

                if (poppedCount === balloons.length) {
                    setTimeout(() => showScreen('step3'), 800);
                }
            });
        });
    }

    function createPlaceholderImage(label, index) {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
                <rect width="100%" height="100%" fill="#ffe6ef"/>
                <circle cx="400" cy="220" r="140" fill="#ffb6d0"/>
                <circle cx="340" cy="210" r="16" fill="#fff"/>
                <circle cx="460" cy="210" r="16" fill="#fff"/>
                <circle cx="340" cy="210" r="8" fill="#333"/>
                <circle cx="460" cy="210" r="8" fill="#333"/>
                <path d="M330 270 Q400 320 470 270" stroke="#ff5d8f" stroke-width="10" fill="none" stroke-linecap="round"/>
                <text x="50%" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#7a2e4d">${label} Memory ${index}</text>
            </svg>`;
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }

    const slideData = {
        mom: {
            title: 'Mom Memories',
            images: [createPlaceholderImage('Mom', 1), createPlaceholderImage('Mom', 2), createPlaceholderImage('Mom', 3)]
        },
        dad: {
            title: 'Dad Memories',
            images: [createPlaceholderImage('Dad', 1), createPlaceholderImage('Dad', 2), createPlaceholderImage('Dad', 3)]
        },
        sibling: {
            title: 'Sibling Memories',
            images: [
                'Photos/sibling/20250830_170214.jpg',
                'Photos/sibling/20250830_193453.jpg',
                'Photos/sibling/20251010_200109.jpg',
                'Photos/sibling/20251029_143348.jpg',
                'Photos/sibling/20260127_113603.jpg',
                'Photos/sibling/20260127_140159.jpg',
                'Photos/sibling/20260326_153937.jpg',
                'Photos/sibling/20260326_170034.jpg',
                'Photos/sibling/20260326_172706.jpg',
                'Photos/sibling/20260331_112532.jpg',
                'Photos/sibling/20260522_141846.jpg',
                'Photos/sibling/IMG-20260522-WA0059.jpg',
                'Photos/sibling/img_01.jpg'
            ]
        }
    };

    let currentIndex = 0;
    let currentPerson = '';
    let autoplayInterval = null;

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            currentPerson = card.dataset.person;
            currentIndex = 0;
            openSlideshow();
        });
    });

    function openSlideshow() {
        const modal = document.getElementById('slideshowModal');
        document.getElementById('slideshowTitle').textContent = slideData[currentPerson].title;
        modal.classList.add('active');
        showSlide();
        autoplayInterval = setInterval(nextSlide, 2600);
    }

    function showSlide() {
        const img = document.getElementById('slideImage');
        const counter = document.getElementById('slideshowCounter');
        img.src = slideData[currentPerson].images[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${slideData[currentPerson].images.length}`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideData[currentPerson].images.length;
        showSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideData[currentPerson].images.length) % slideData[currentPerson].images.length;
        showSlide();
    }

    function closeSlideshow() {
        document.getElementById('slideshowModal').classList.remove('active');
        clearInterval(autoplayInterval);
    }

    document.getElementById('slideshowModal').addEventListener('click', (event) => {
        if (event.target === event.currentTarget) closeSlideshow();
    });

