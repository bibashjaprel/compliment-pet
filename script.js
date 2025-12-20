// ============================================
// COMPLIMENT PET - COMPLETE JAVASCRIPT
// All features implemented
// ============================================

// Achievement definitions
const ACHIEVEMENTS = {
  'firstCompliment': { emoji: '🎉', title: '10 compliments', threshold: 10 },
  'hundred': { emoji: '💯', title: '100 compliments', threshold: 100 },
  'weekStreak': { emoji: '🔥', title: '7-day streak', threshold: 7, type: 'streak' },
  'monthStreak': { emoji: '🌟', title: '30-day streak', threshold: 30, type: 'streak' },
  'kind': { emoji: '💖', title: 'Kind heart', threshold: 50 },
  'legendary': { emoji: '👑', title: 'Legend', threshold: 500 }
};

// Compliment templates
const TEMPLATES = [
  "You're incredibly creative and unique!",
  "Your positivity is contagious and inspiring.",
  "You make others feel good about themselves.",
  "You're a great listener and friend.",
  "Your effort and dedication are admirable.",
  "You have excellent problem-solving skills.",
  "You're thoughtful and considerate.",
  "Your passion is inspiring to those around you.",
  "You're genuinely kind-hearted.",
  "You bring out the best in other people."
];

// Motivational quotes for pet
const QUOTES = [
  "Every compliment is a seed of kindness.",
  "Your words have the power to change someone's day.",
  "Keep spreading positivity!",
  "One compliment at a time makes the world brighter.",
  "You're a beacon of kindness!",
  "Thank you for being so caring.",
  "Your compassion matters more than you know.",
  "Never underestimate the power of kind words."
];

class ComplimentPet {
  constructor() {
    // DOM Elements
    this.petEl = document.getElementById('pet');
    this.petMoodEl = document.getElementById('petMood');
    this.petLevel = document.getElementById('petLevel');
    this.petExpFill = document.getElementById('petExpFill');
    this.complimentInput = document.getElementById('complimentInput');
    this.complimentBtn = document.getElementById('complimentBtn');
    this.statusText = document.getElementById('statusText');
    this.petResponse = document.getElementById('petResponse');
    this.lastComplimentEl = document.getElementById('lastCompliment');
    this.currentStreak = document.getElementById('currentStreak');
    this.bestStreak = document.getElementById('bestStreak');
    this.totalCompliments = document.getElementById('totalCompliments');
    this.charCountEl = document.getElementById('charCount');
    this.achievementsGrid = document.getElementById('achievementsGrid');
    this.toast = document.getElementById('toast');
    this.confettiCanvas = document.getElementById('confetti');

    // Modal elements
    this.historyModal = document.getElementById('historyModal');
    this.statsModal = document.getElementById('statsModal');
    this.templatesModal = document.getElementById('templatesModal');

    // Storage keys
    this.STORAGE_KEYS = {
      lastComplimentDate: 'cp_lastComplimentDate',
      lastComplimentText: 'cp_lastComplimentText',
      streak: 'cp_streak',
      bestStreak: 'cp_bestStreak',
      totalCompliments: 'cp_totalCompliments',
      complimentHistory: 'cp_complimentHistory',
      petSkin: 'cp_petSkin',
      petLevel: 'cp_petLevel',
      petExp: 'cp_petExp',
      soundEnabled: 'cp_soundEnabled',
      achievements: 'cp_achievements'
    };

    // Pet responses
    this.petResponses = [
      "Aw, thank you! 💜",
      "You made me so happy! ✨",
      "I feel so loved! 💖",
      "That means everything! 🥺",
      "You're the best! 🎉",
      "My heart is so full! 💕",
      "That made my day! ☀️",
      "I'm bouncing with joy! 🎈"
    ];

    this.init();
  }

  init() {
    // Initialize data
    this.loadAllData();
    this.updateMoodState();
    this.displayLastCompliment();
    this.displayStats();
    this.renderAchievements();

    // Setup event listeners
    this.setupEventListeners();

    // Canvas setup for confetti
    this.setupConfetti();
  }

  setupEventListeners() {
    // Main functionality
    this.complimentBtn.addEventListener('click', () => this.submitCompliment());
    this.complimentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.submitCompliment();
    });
    this.complimentInput.addEventListener('input', () => {
      this.charCountEl.textContent = this.complimentInput.value.length;
    });

    // Pet interaction
    this.petEl.addEventListener('click', () => this.petEasterEgg());

    // Skin selection
    document.querySelectorAll('.skin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.changePetSkin(e.target.dataset.skin));
    });

    // Settings
    document.getElementById('soundToggle').addEventListener('click', () => this.toggleSound());
    document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    document.getElementById('historyBtn').addEventListener('click', () => this.showHistoryModal());
    document.getElementById('statsBtn').addEventListener('click', () => this.showStatsModal());

    // Suggestions
    document.getElementById('randomComplimentBtn').addEventListener('click', () => this.showRandomCompliment());
    document.getElementById('templatesBtn').addEventListener('click', () => this.showTemplatesModal());

    // Emoji picker (simple button - adds random emoji)
    document.getElementById('emojiPickerBtn').addEventListener('click', () => {
      const emojis = ['😊', '😍', '🥰', '😄', '💖', '✨', '🌟', '💪', '🔥', '🎉'];
      this.complimentInput.value += emojis[Math.floor(Math.random() * emojis.length)];
      this.charCountEl.textContent = this.complimentInput.value.length;
    });

    // Modal close buttons
    document.getElementById('historyClose').addEventListener('click', () => this.closeModal(this.historyModal));
    document.getElementById('statsClose').addEventListener('click', () => this.closeModal(this.statsModal));
    document.getElementById('templatesClose').addEventListener('click', () => this.closeModal(this.templatesModal));

    // Export and clear
    document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
    document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearHistory());

    // Modal backdrop click
    [this.historyModal, this.statsModal, this.templatesModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });
  }

  submitCompliment() {
    const compliment = this.complimentInput.value.trim();
    if (compliment.length < 10) {
      this.showToast('Compliments need 10+ characters! ✍️', 'error');
      return;
    }
    if (this.hasComplimentedToday()) {
      this.showToast('Already complimented today! Come back tomorrow! 🌙', 'error');
      return;
    }
    this.saveCompliment(compliment);
    this.complimentInput.value = '';
    this.charCountEl.textContent = '0';
    this.updateMoodState();
    this.displayLastCompliment();
    this.displayStats();
    this.renderAchievements();
    this.showPetResponse();
    this.animatePet();
    this.createConfetti();
    this.showToast('🎉 Your pet is happy!', 'success');
    this.playSound();
  }

  saveCompliment(compliment) {
    const today = this.getTodayDate();
    localStorage.setItem(this.STORAGE_KEYS.lastComplimentDate, today);
    localStorage.setItem(this.STORAGE_KEYS.lastComplimentText, compliment);
    this.incrementStreak();
    let history = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.complimentHistory) || '[]');
    history.unshift({ date: new Date().toISOString(), text: compliment });
    history = history.slice(0, 1000);
    localStorage.setItem(this.STORAGE_KEYS.complimentHistory, JSON.stringify(history));
    let total = parseInt(localStorage.getItem(this.STORAGE_KEYS.totalCompliments) || '0') + 1;
    localStorage.setItem(this.STORAGE_KEYS.totalCompliments, total);
    this.gainExp(10);
  }

  incrementStreak() {
    const lastDate = localStorage.getItem(this.STORAGE_KEYS.lastComplimentDate);
    const today = this.getTodayDate();
    let streak = parseInt(localStorage.getItem(this.STORAGE_KEYS.streak) || '0');
    let bestStreak = parseInt(localStorage.getItem(this.STORAGE_KEYS.bestStreak) || '0');
    if (lastDate === today) return;
    if (lastDate) {
      const daysDiff = Math.floor((new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
      streak = daysDiff === 1 ? streak + 1 : 1;
    } else {
      streak = 1;
    }
    if (streak > bestStreak) {
      bestStreak = streak;
      localStorage.setItem(this.STORAGE_KEYS.bestStreak, bestStreak);
    }
    localStorage.setItem(this.STORAGE_KEYS.streak, streak);
  }

  gainExp(amount) {
    let level = parseInt(localStorage.getItem(this.STORAGE_KEYS.petLevel) || '1');
    let exp = parseInt(localStorage.getItem(this.STORAGE_KEYS.petExp) || '0');
    exp += amount;
    const expPerLevel = 50;
    while (exp >= expPerLevel) {
      level += 1;
      exp -= expPerLevel;
    }
    localStorage.setItem(this.STORAGE_KEYS.petLevel, level);
    localStorage.setItem(this.STORAGE_KEYS.petExp, exp);
    this.updateLevelDisplay();
  }

  updateMoodState() {
    const hasComplimentedToday = this.hasComplimentedToday();
    if (hasComplimentedToday) {
      this.petEl.textContent = this.getPetSkin();
      this.petMoodEl.textContent = '😄 Happy! Keep it up! 💖';
      this.statusText.textContent = '✨ Your pet is happy today! Compliment again tomorrow.';
    } else {
      this.petEl.textContent = this.getPetSkin();
      this.petMoodEl.textContent = '😢 Sad... needs a compliment';
      this.statusText.textContent = '😔 Your pet needs love! Write a compliment!';
    }
    this.petEl.classList.remove('mood-change');
    void this.petEl.offsetWidth;
    this.petEl.classList.add('mood-change');
  }

  updateLevelDisplay() {
    const level = parseInt(localStorage.getItem(this.STORAGE_KEYS.petLevel) || '1');
    const exp = parseInt(localStorage.getItem(this.STORAGE_KEYS.petExp) || '0');
    const expPercent = (exp / 50) * 100;
    this.petLevel.textContent = `Level ${level}`;
    this.petExpFill.style.width = expPercent + '%';
  }

  getPetSkin() {
    return localStorage.getItem(this.STORAGE_KEYS.petSkin) || '😊';
  }

  changePetSkin(skin) {
    localStorage.setItem(this.STORAGE_KEYS.petSkin, skin);
    document.querySelectorAll('.skin-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.skin === skin);
    });
    this.petEl.textContent = skin;
    this.showToast(`Your pet is now ${skin}!`, 'success');
  }

  hasComplimentedToday() {
    const lastDate = localStorage.getItem(this.STORAGE_KEYS.lastComplimentDate);
    return lastDate === this.getTodayDate();
  }

  getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  displayLastCompliment() {
    const lastCompliment = localStorage.getItem(this.STORAGE_KEYS.lastComplimentText);
    if (lastCompliment) {
      this.lastComplimentEl.textContent = `"${lastCompliment}"`;
      this.lastComplimentEl.style.color = '#ffd93d';
    } else {
      this.lastComplimentEl.textContent = 'No compliments yet. Be the first!';
      this.lastComplimentEl.style.color = '#a8dadc';
    }
  }

  displayStats() {
    const streak = parseInt(localStorage.getItem(this.STORAGE_KEYS.streak) || '0');
    const bestStreak = parseInt(localStorage.getItem(this.STORAGE_KEYS.bestStreak) || '0');
    const total = parseInt(localStorage.getItem(this.STORAGE_KEYS.totalCompliments) || '0');
    this.currentStreak.textContent = streak;
    this.bestStreak.textContent = bestStreak;
    this.totalCompliments.textContent = total;
    this.updateLevelDisplay();
  }

  renderAchievements() {
    const total = parseInt(localStorage.getItem(this.STORAGE_KEYS.totalCompliments) || '0');
    const streak = parseInt(localStorage.getItem(this.STORAGE_KEYS.streak) || '0');
    let achievements = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.achievements) || '{}');
    this.achievementsGrid.innerHTML = '';
    for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
      const threshold = achievement.type === 'streak' ? streak : total;
      const unlocked = threshold >= achievement.threshold;
      if (unlocked && !achievements[key]) {
        achievements[key] = true;
        localStorage.setItem(this.STORAGE_KEYS.achievements, JSON.stringify(achievements));
      }
      const el = document.createElement('div');
      el.className = `achievement ${unlocked ? 'unlocked' : ''}`;
      el.setAttribute('data-title', achievement.title);
      el.innerHTML = this.getAchievementSVG(key, unlocked);
      this.achievementsGrid.appendChild(el);
    }

    // Update achievement count badge
    const unlockedCount = Object.keys(achievements).length;
    const totalCount = Object.keys(ACHIEVEMENTS).length;
    const achievementCountEl = document.getElementById('achievementCount');
    if (achievementCountEl) {
      achievementCountEl.textContent = `${unlockedCount}/${totalCount}`;
    }
  }

  getAchievementSVG(type, unlocked) {
    const color = unlocked ? '#ffd93d' : '#555';
    const accentColor = unlocked ? '#ff6b9d' : '#333';

    const svgs = {
      firstCompliment: `
        <svg viewBox="0 0 100 100" class="achievement-svg">
          <circle cx="50" cy="50" r="45" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
          <path d="M 30 65 L 50 35 L 70 65 L 60 55 L 50 75 L 40 55 Z" fill="${accentColor}"/>
          <circle cx="50" cy="30" r="8" fill="${accentColor}"/>
          <text x="50" y="55" text-anchor="middle" fill="${accentColor}" font-size="20" font-weight="bold">10</text>
        </svg>
      `,
      hundred: `
        <svg viewBox="0 0 100 100" class="achievement-svg">
          <circle cx="50" cy="50" r="45" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
          <text x="50" y="65" text-anchor="middle" fill="${accentColor}" font-size="35" font-weight="900">100</text>
          <circle cx="25" cy="25" r="5" fill="${accentColor}"/>
          <circle cx="75" cy="25" r="5" fill="${accentColor}"/>
          <circle cx="25" cy="75" r="5" fill="${accentColor}"/>
          <circle cx="75" cy="75" r="5" fill="${accentColor}"/>
        </svg>
      `,
      weekStreak: `
        <svg viewBox="0 0 100 100" class="achievement-svg">
          <circle cx="50" cy="50" r="45" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
          <path d="M 50 20 L 45 35 L 30 40 L 42 52 L 40 68 L 50 60 L 60 68 L 58 52 L 70 40 L 55 35 Z" fill="#ff6b9d" stroke="#ff1744" stroke-width="2"/>
          <path d="M 35 75 Q 50 85 65 75" stroke="#ff1744" stroke-width="3" fill="none"/>
        </svg>
      `,
      monthStreak: `
        <svg viewBox="0 0 100 100" class="achievement-svg">
          <circle cx="50" cy="50" r="45" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
          <path d="M 50 15 L 55 35 L 75 35 L 60 48 L 68 68 L 50 55 L 32 68 L 40 48 L 25 35 L 45 35 Z" fill="${accentColor}"/>
          <circle cx="50" cy="50" r="15" fill="white" opacity="0.3"/>
          <text x="50" y="92" text-anchor="middle" fill="${accentColor}" font-size="12" font-weight="bold">30</text>
        </svg>
      `,
      kind: `
        <svg viewBox="0 0 100 100" class="achievement-svg">
          <circle cx="50" cy="50" r="45" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
          <path d="M 50 75 L 30 50 Q 25 40 30 30 Q 40 25 50 35 Q 60 25 70 30 Q 75 40 70 50 Z" fill="#ff6b9d" stroke="#ff1744" stroke-width="2"/>
          <circle cx="40" cy="38" r="3" fill="white"/>
          <circle cx="60" cy="38" r="3" fill="white"/>
        </svg>
      `,
      legendary: `
        <svg viewBox="0 0 100 100" class="achievement-svg">
          <circle cx="50" cy="50" r="45" fill="${color}" stroke="${accentColor}" stroke-width="3"/>
          <path d="M 30 70 L 30 45 L 35 40 L 35 30 L 50 20 L 65 30 L 65 40 L 70 45 L 70 70 Z" fill="${accentColor}"/>
          <rect x="40" y="55" width="20" height="15" fill="${color}"/>
          <circle cx="35" cy="50" r="4" fill="${color}"/>
          <circle cx="50" cy="47" r="4" fill="${color}"/>
          <circle cx="65" cy="50" r="4" fill="${color}"/>
          <path d="M 25 70 L 35 60 L 45 70 L 40 65 L 30 75 Z" fill="${accentColor}"/>
          <path d="M 75 70 L 65 60 L 55 70 L 60 65 L 70 75 Z" fill="${accentColor}"/>
        </svg>
      `
    };

    return svgs[type] || `<span>${ACHIEVEMENTS[type].emoji}</span>`;
  }

  showPetResponse() {
    const response = this.petResponses[Math.floor(Math.random() * this.petResponses.length)];
    this.petResponse.textContent = response;
    setTimeout(() => { this.petResponse.textContent = ''; }, 2500);
  }

  petEasterEgg() {
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    this.petResponse.textContent = quote;
    this.petResponse.style.color = '#48dbfb';
    this.animatePet();
    setTimeout(() => {
      this.petResponse.textContent = '';
      this.petResponse.style.color = '#ffd93d';
    }, 3000);
  }

  showRandomCompliment() {
    const random = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    this.complimentInput.value = random;
    this.charCountEl.textContent = random.length;
    this.showToast('💡 Here\'s an idea!', 'success');
  }

  showTemplatesModal() {
    const templatesList = document.getElementById('templatesList');
    templatesList.innerHTML = '';
    TEMPLATES.forEach(template => {
      const item = document.createElement('div');
      item.className = 'template-item';
      item.textContent = template;
      item.addEventListener('click', () => {
        this.complimentInput.value = template;
        this.charCountEl.textContent = template.length;
        this.closeModal(this.templatesModal);
      });
      templatesList.appendChild(item);
    });
    this.openModal(this.templatesModal);
  }

  showHistoryModal() {
    const history = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.complimentHistory) || '[]');
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    if (history.length === 0) {
      historyList.innerHTML = '<p style="color: #a8dadc; text-align: center;">No compliments yet!</p>';
    } else {
      history.forEach(entry => {
        const date = new Date(entry.date);
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `<div class="history-date">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</div><div class="history-text">"${entry.text}"</div>`;
        historyList.appendChild(item);
      });
    }
    this.openModal(this.historyModal);
  }

  showStatsModal() {
    const history = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.complimentHistory) || '[]');
    const thisWeek = history.filter(entry => {
      const date = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date > weekAgo;
    }).length;
    document.getElementById('statsTotalCompliments').textContent = localStorage.getItem(this.STORAGE_KEYS.totalCompliments) || '0';
    document.getElementById('statsCurrentStreak').textContent = localStorage.getItem(this.STORAGE_KEYS.streak) || '0';
    document.getElementById('statsBestStreak').textContent = localStorage.getItem(this.STORAGE_KEYS.bestStreak) || '0';
    document.getElementById('statsThisWeek').textContent = thisWeek;
    this.openModal(this.statsModal);
  }

  exportData() {
    const data = {
      totalCompliments: localStorage.getItem(this.STORAGE_KEYS.totalCompliments),
      streak: localStorage.getItem(this.STORAGE_KEYS.streak),
      bestStreak: localStorage.getItem(this.STORAGE_KEYS.bestStreak),
      petLevel: localStorage.getItem(this.STORAGE_KEYS.petLevel),
      history: JSON.parse(localStorage.getItem(this.STORAGE_KEYS.complimentHistory) || '[]'),
      exportDate: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliment-pet-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    this.showToast('📥 Data exported!', 'success');
  }

  clearHistory() {
    if (confirm('Clear all history? Cannot undo!')) {
      localStorage.setItem(this.STORAGE_KEYS.complimentHistory, '[]');
      this.showHistoryModal();
      this.showToast('🗑️ History cleared!', 'success');
    }
  }

  openModal(modal) { modal.classList.add('active'); }
  closeModal(modal) { modal.classList.remove('active'); }

  showToast(message, type = 'success') {
    this.toast.textContent = message;
    this.toast.className = `toast show ${type}`;
    setTimeout(() => { this.toast.classList.remove('show'); }, 3000);
  }

  animatePet() {
    this.petEl.style.animation = 'none';
    void this.petEl.offsetWidth;
    this.petEl.style.animation = 'petBounce 0.6s ease-in-out';
  }

  toggleSound() {
    const btn = document.getElementById('soundToggle');
    const enabled = !btn.classList.contains('active');
    btn.classList.toggle('active');
    localStorage.setItem(this.STORAGE_KEYS.soundEnabled, enabled);
    this.showToast(enabled ? '🔊 Sound enabled!' : '🔇 Sound disabled!', 'success');
  }

  playSound() {
    const enabled = localStorage.getItem(this.STORAGE_KEYS.soundEnabled) !== 'false';
    if (enabled) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = 800;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.1);
      } catch (e) { }
    }
  }

  toggleTheme() {
    document.body.style.filter = document.body.style.filter === 'invert(1)' ? '' : 'invert(1)';
    this.showToast(document.body.style.filter ? '☀️ Light mode!' : '🌙 Dark mode!', 'success');
  }

  createConfetti() {
    const ctx = this.confettiCanvas.getContext('2d');
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
    const confetti = [];
    for (let i = 0; i < 50; i++) {
      confetti.push({
        x: Math.random() * window.innerWidth,
        y: -10,
        w: Math.random() * 10 + 5,
        h: Math.random() * 10 + 5,
        opacity: Math.random() * 0.5 + 0.5,
        dx: (Math.random() - 0.5) * 8,
        dy: Math.random() * 3 + 2,
        color: ['#ff6b9d', '#ffd93d', '#48dbfb', '#feca57'][Math.floor(Math.random() * 4)]
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      confetti.forEach((c, i) => {
        c.x += c.dx;
        c.y += c.dy;
        c.opacity -= 0.01;
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.w, c.h);
        if (c.opacity <= 0) confetti.splice(i, 1);
      });
      if (confetti.length > 0) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    };
    animate();
  }

  setupConfetti() {
    window.addEventListener('resize', () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    });
  }

  loadAllData() {
    const skin = this.getPetSkin();
    document.querySelectorAll('.skin-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.skin === skin);
    });
    const soundEnabled = localStorage.getItem(this.STORAGE_KEYS.soundEnabled) !== 'false';
    if (soundEnabled) document.getElementById('soundToggle').classList.add('active');
  }
}

class Navigation {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    this.navToggle.addEventListener('click', () => this.toggleMenu());
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
        const href = link.getAttribute('href');
        if (href.startsWith('#')) setTimeout(() => this.smoothScroll(href), 100);
      });
    });
    window.addEventListener('scroll', () => this.updateActiveLink());
  }

  toggleMenu() {
    this.navMenu.classList.toggle('active');
    this.updateToggleIcon();
  }

  closeMenu() { this.navMenu.classList.remove('active'); }

  updateToggleIcon() {
    const spans = this.navToggle.querySelectorAll('span');
    if (this.navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  smoothScroll(href) {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  updateActiveLink() {
    const sections = document.querySelectorAll('section, .header');
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 100) currentSection = section.getAttribute('id');
    });
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ComplimentPet();
  new Navigation();
});
