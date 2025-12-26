// ui.js - Handles DOM updates, modals, notifications, confetti, sound, theme
export class UI {
  static updatePet(pet) {
    const petEl = document.getElementById('pet');
    petEl.textContent = pet.skin;
    petEl.className = `pet pet--${pet.mood}`;
  }
  static updateStats(streak, bestStreak, total) {
    document.getElementById('currentStreak').textContent = streak;
    document.getElementById('bestStreak').textContent = bestStreak;
    document.getElementById('totalCompliments').textContent = total;
  }
  static showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
  }
  static renderAchievements(achievements) {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    let unlockedNow = null;
    achievements.forEach(a => {
      const el = document.createElement('div');
      el.className = `achievement ${a.unlocked ? 'unlocked' : ''}`;
      el.innerHTML = a.svg;
      if (a.justUnlocked) {
        el.classList.add('pop');
        unlockedNow = a;
        setTimeout(() => el.classList.remove('pop'), 1200);
      }
      grid.appendChild(el);
    });
    // Announce achievement unlock for screen readers
    if (unlockedNow) {
      UI.announceAchievement(unlockedNow.title);
    }
  }

  static announceAchievement(title) {
    let live = document.getElementById('achievement-live');
    if (!live) {
      live = document.createElement('div');
      live.id = 'achievement-live';
      live.className = 'sr-only';
      live.setAttribute('aria-live', 'polite');
      document.body.appendChild(live);
    }
    live.textContent = `Achievement unlocked: ${title}`;
  }
  // ...other UI methods (modals, confetti, sound, theme, etc.)
}
