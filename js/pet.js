// pet.js - Handles pet state, mood, level, and skin
import { StorageManager } from './storage.js';

export class Pet {
  constructor() {
    this.skin = StorageManager.get('cp_petSkin', '😊');
    this.level = StorageManager.get('cp_petLevel', 1);
    this.exp = StorageManager.get('cp_petExp', 0);
    this.mood = 'neutral';
  }
  updateMood(streak) {
    this.mood = streak > 5 ? 'happy' : 'neutral';
    StorageManager.set('cp_petMood', this.mood);
  }
  setSkin(skin) {
    this.skin = skin;
    StorageManager.set('cp_petSkin', skin);
  }
  gainExp(amount) {
    this.exp += amount;
    const expPerLevel = 50;
    while (this.exp >= expPerLevel) {
      this.level++;
      this.exp -= expPerLevel;
    }
    StorageManager.set('cp_petLevel', this.level);
    StorageManager.set('cp_petExp', this.exp);
  }
}
