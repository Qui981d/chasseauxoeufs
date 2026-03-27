/* ============================================================
   MAIN.JS — Chasse aux Œufs La Combe
   Application logic: navigation, form, enigmas, confetti
   ============================================================ */

import './style.css';

// ─── Enigma Data ────────────────────────────────────────────
const ENIGMAS = [
    {
        id: 1,
        emoji: '🕶️',
        commerce: 'Opticien',
        riddle: 'Je vous protège quand le soleil se montre, mais je ne vois rien sans vous. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 2,
        emoji: '💊',
        commerce: 'Pharmacie',
        riddle: 'Je suis l\'adresse des petits bobos et des grands remèdes. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 3,
        emoji: '📱',
        commerce: 'Réparation de téléphones',
        riddle: 'Je leur redonne vie quand ils tombent, se cassent ou s\'éteignent. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 4,
        emoji: '👔',
        commerce: 'Pressing',
        riddle: 'Je m\'en occupe à votre place quand le temps vous manque. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 5,
        emoji: '🌸',
        commerce: 'Fleuriste',
        riddle: 'Je sens bon, je colore les journées, et je dis «\u00a0je pense à toi\u00a0» sans parler. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 6,
        emoji: '💎',
        commerce: 'Bijouterie',
        riddle: 'Je brille sans faire de bruit, je célèbre les moments importants, et je tiens dans une petite boîte. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 7,
        emoji: '✂️',
        commerce: 'Boutique de coiffure',
        riddle: 'Je ne coupe pas, mais j\'équipe ceux qui le font. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 8,
        emoji: '📚',
        commerce: 'Librairie',
        riddle: 'Je suis fait d\'histoires et de voyages immobiles que l\'on emporte avec soi. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 9,
        emoji: '☕',
        commerce: 'Café',
        riddle: 'Je réchauffe les mains, je réveille les esprits, et je marque souvent une pause. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 10,
        emoji: '🛒',
        commerce: 'Supermarché',
        riddle: 'Au sous-sol, je rassemble tout ce dont vous avez besoin au quotidien. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 11,
        emoji: '👗',
        commerce: 'Magasin de mode',
        riddle: 'On vient chez moi pour essayer, changer, renouveler, et parfois pour un coup de cœur. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 12,
        emoji: '🍷',
        commerce: 'Caviste / spiritueux',
        riddle: 'Je ne suis pas pour les enfants, et on me choisit souvent pour offrir ou célébrer. Qui suis-je\u00a0?',
        isBonus: false,
    },
    {
        id: 13,
        emoji: '🏬',
        commerce: 'La Combe',
        riddle: 'Je suis l\'endroit où l\'on peut faire une pause, se refaire une beauté, réparer son indispensable et repartir avec l\'essentiel. Qui suis-je\u00a0?',
        isBonus: true,
    },
];

// ─── State ──────────────────────────────────────────────────
let currentScreen = 'landing';
let currentEnigmaIndex = 0;
let playerName = '';

// ─── DOM References ─────────────────────────────────────────
const screens = {
    landing: document.getElementById('landing'),
    registration: document.getElementById('registration'),
    game: document.getElementById('game'),
    final: document.getElementById('final'),
};

const btnStart = document.getElementById('btn-start');
const form = document.getElementById('registration-form');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnRestart = document.getElementById('btn-restart');
const enigmaContainer = document.getElementById('enigma-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const enigmaHint = document.getElementById('enigma-hint');
const finalName = document.getElementById('final-name');
const confettiContainer = document.getElementById('confetti-container');

// ─── Navigation ─────────────────────────────────────────────
function navigateTo(screenId) {
    // Hide current
    if (screens[currentScreen]) {
        screens[currentScreen].classList.remove('active');
    }

    // Show target
    currentScreen = screenId;
    const target = screens[screenId];
    if (target) {
        target.classList.add('active');
        // Scroll to top
        window.scrollTo(0, 0);
        target.scrollTop = 0;
    }
}

// ─── Landing → Registration ─────────────────────────────────
btnStart.addEventListener('click', () => {
    navigateTo('registration');
});

// ─── Registration → Game ────────────────────────────────────
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset errors
    document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));

    const prenomInput = document.getElementById('prenom');
    const emailInput = document.getElementById('email');
    const anneeInput = document.getElementById('annee');

    let valid = true;

    // Validate prénom
    if (!prenomInput.value.trim()) {
        prenomInput.closest('.form-group').classList.add('has-error');
        prenomInput.classList.add('error');
        valid = false;
    } else {
        prenomInput.classList.remove('error');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('has-error');
        emailInput.classList.add('error');
        valid = false;
    } else {
        emailInput.classList.remove('error');
    }

    // Validate année
    const year = parseInt(anneeInput.value, 10);
    if (!year || year < 1920 || year > 2020) {
        anneeInput.closest('.form-group').classList.add('has-error');
        anneeInput.classList.add('error');
        valid = false;
    } else {
        anneeInput.classList.remove('error');
    }

    if (!valid) return;

    // Save player name
    playerName = prenomInput.value.trim();

    // Mock form data log (replace with Formspree later)
    const formData = {
        prenom: prenomInput.value.trim(),
        email: emailInput.value.trim(),
        annee_naissance: anneeInput.value,
        optin_newsletter: document.getElementById('optin').checked,
        timestamp: new Date().toISOString(),
    };
    console.log('📋 Formulaire soumis (mock):', formData);

    // Start game
    currentEnigmaIndex = 0;
    renderEnigma();
    navigateTo('game');
});

// ─── Enigma Rendering ───────────────────────────────────────
function renderEnigma() {
    const enigma = ENIGMAS[currentEnigmaIndex];
    const total = ENIGMAS.length;
    const current = currentEnigmaIndex + 1;

    // Update progress
    const percent = (current / total) * 100;
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `Énigme ${current} / ${total}`;

    // Update hint text (generic, no spoiler)
    if (enigma.isBonus) {
        enigmaHint.innerHTML =
            '🎁 Des bons cadeaux sont à gagner pour les 5 premiers arrivés\u00a0!';
    } else {
        enigmaHint.innerHTML =
            'Tu as trouvé\u00a0? Rendez-vous chez le commerçant pour récupérer tes chocolats\u00a0!';
    }

    // Update button text
    if (currentEnigmaIndex === total - 1) {
        btnNext.innerHTML = 'Terminer le jeu <span class="btn-arrow">🎉</span>';
    } else {
        btnNext.innerHTML = 'Suivante <span class="btn-arrow">→</span>';
    }

    // Show/hide back button
    if (currentEnigmaIndex === 0) {
        btnPrev.classList.add('hidden');
    } else {
        btnPrev.classList.remove('hidden');
    }

    // Render card
    const cardClass = enigma.isBonus ? 'enigma-card enigma-card--bonus' : 'enigma-card';

    enigmaContainer.innerHTML = `
    <div class="${cardClass}" key="${enigma.id}">
      <span class="enigma-number">${current}</span>
      <p class="enigma-text">«\u00a0${enigma.riddle}\u00a0»</p>
    </div>
  `;
}

// ─── Next Enigma / Finish ───────────────────────────────────
btnNext.addEventListener('click', () => {
    if (currentEnigmaIndex < ENIGMAS.length - 1) {
        currentEnigmaIndex++;
        renderEnigma();
    } else {
        // Game complete → final screen
        finalName.textContent = playerName;
        navigateTo('final');
        launchConfetti();
    }
});

// ─── Previous Enigma ────────────────────────────────────────
btnPrev.addEventListener('click', () => {
    if (currentEnigmaIndex > 0) {
        currentEnigmaIndex--;
        renderEnigma();
    }
});

// ─── Restart ────────────────────────────────────────────────
btnRestart.addEventListener('click', () => {
    currentEnigmaIndex = 0;
    playerName = '';
    form.reset();
    document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));
    document.querySelectorAll('.form-input').forEach((i) => i.classList.remove('error'));
    navigateTo('landing');
});

// ─── Confetti Effect ────────────────────────────────────────
function launchConfetti() {
    confettiContainer.innerHTML = '';

    const colors = ['#E31918', '#FFD54F', '#7CB342', '#F8BBD0', '#B3E5FC', '#E1BEE7', '#FF8A65'];
    const shapes = ['square', 'circle'];
    const count = 60;

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';

        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const size = Math.random() * 8 + 6;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 1.5;

        piece.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : '2px'};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

        confettiContainer.appendChild(piece);
    }

    // Clean up after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// ─── Keyboard accessibility ─────────────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && currentScreen === 'game') {
        btnNext.click();
    }
});
