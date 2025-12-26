// main.js - App entry point, event binding, initialization
import { StorageManager } from './storage.js';
import { Pet } from './pet.js';
import { ComplimentManager } from './complimentManager.js';
import { UI } from './ui.js';

// Example: App initialization and event binding


document.addEventListener('DOMContentLoaded', () => {
  const pet = new Pet();
  const complimentManager = new ComplimentManager();

  // Theme toggle logic
  const themeKey = 'cp_theme';
  const themeToggleBtn = document.getElementById('themeToggle');
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }
  // Load theme from localStorage or system preference
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem(themeKey, isLight ? 'light' : 'dark');
    UI.showToast(isLight ? '☀️ Light mode!' : '🌙 Dark mode!', 'success');
  });

  // Initial UI update
  UI.updatePet(pet);
  UI.updateStats(
    StorageManager.get('cp_streak', 0),
    StorageManager.get('cp_bestStreak', 0),
    StorageManager.get('cp_totalCompliments', 0)
  );

  // Example event binding for compliment submission
  document.getElementById('complimentBtn').addEventListener('click', () => {
    const input = document.getElementById('complimentInput');
    const compliment = input.value.trim();
    if (compliment.length < 10) {
      UI.showToast('Compliments need 10+ characters! ✍️', 'error');
      return;
    }
    if (!complimentManager.canComplimentToday()) {
      UI.showToast('Already complimented today! Come back tomorrow! 🌙', 'error');
      return;
    }
    complimentManager.addCompliment(compliment);
    pet.updateMood(StorageManager.get('cp_streak', 0));
    pet.gainExp(10);
    UI.updatePet(pet);
    UI.updateStats(
      StorageManager.get('cp_streak', 0),
      StorageManager.get('cp_bestStreak', 0),
      StorageManager.get('cp_totalCompliments', 0)
    );
    UI.showToast('🎉 Your pet is happy!', 'success');
    input.value = '';
  });

  // ...bind other events and initialize other UI features
});
