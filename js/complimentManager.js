// complimentManager.js - Handles compliment logic, streaks, achievements
import { StorageManager } from './storage.js';

export class ComplimentManager {
  constructor() {
    this.STORAGE_KEYS = {
      lastComplimentDate: 'cp_lastComplimentDate',
      lastComplimentText: 'cp_lastComplimentText',
      streak: 'cp_streak',
      bestStreak: 'cp_bestStreak',
      totalCompliments: 'cp_totalCompliments',
      complimentHistory: 'cp_complimentHistory',
      achievements: 'cp_achievements'
    };
  }
  canComplimentToday() {
    const lastDate = StorageManager.get(this.STORAGE_KEYS.lastComplimentDate);
    return lastDate !== this.getTodayDate();
  }
  addCompliment(text) {
    const today = this.getTodayDate();
    StorageManager.set(this.STORAGE_KEYS.lastComplimentDate, today);
    StorageManager.set(this.STORAGE_KEYS.lastComplimentText, text);
    this.incrementStreak();
    StorageManager.pushToArray(this.STORAGE_KEYS.complimentHistory, { date: new Date().toISOString(), text }, 1000);
    StorageManager.increment(this.STORAGE_KEYS.totalCompliments);
  }
  incrementStreak() {
    const lastDate = StorageManager.get(this.STORAGE_KEYS.lastComplimentDate);
    const today = this.getTodayDate();
    let streak = StorageManager.get(this.STORAGE_KEYS.streak, 0);
    let bestStreak = StorageManager.get(this.STORAGE_KEYS.bestStreak, 0);
    if (lastDate === today) return;
    if (lastDate) {
      const daysDiff = Math.floor((new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
      streak = daysDiff === 1 ? streak + 1 : 1;
    } else {
      streak = 1;
    }
    if (streak > bestStreak) {
      bestStreak = streak;
      StorageManager.set(this.STORAGE_KEYS.bestStreak, bestStreak);
    }
    StorageManager.set(this.STORAGE_KEYS.streak, streak);
  }
  getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
