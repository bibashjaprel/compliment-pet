// storage.js - Handles all localStorage operations for Compliment Pet
export class StorageManager {
  static get(key, fallback = null) {
    const val = localStorage.getItem(key);
    try { return val ? JSON.parse(val) : fallback; } catch { return fallback; }
  }
  static set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  static remove(key) { localStorage.removeItem(key); }
  static increment(key, amount = 1) {
    let val = parseInt(localStorage.getItem(key) || '0', 10) + amount;
    localStorage.setItem(key, val);
    return val;
  }
  static pushToArray(key, item, maxLength = 1000) {
    let arr = StorageManager.get(key, []);
    arr.unshift(item);
    if (arr.length > maxLength) arr = arr.slice(0, maxLength);
    StorageManager.set(key, arr);
    return arr;
  }
}
