document.addEventListener('DOMContentLoaded', () => {

  // This file is now a legacy entry point. Please use the new modular JS files in /js/ for all app logic.
  // Exporting constants for compatibility if needed.
  export const ACHIEVEMENTS = {
    'firstCompliment': { emoji: '🎉', title: '10 compliments', threshold: 10 },
    'hundred': { emoji: '💯', title: '100 compliments', threshold: 100 },
    'weekStreak': { emoji: '🔥', title: '7-day streak', threshold: 7, type: 'streak' },
    'monthStreak': { emoji: '🌟', title: '30-day streak', threshold: 30, type: 'streak' },
    'kind': { emoji: '💖', title: 'Kind heart', threshold: 50 },
    'legendary': { emoji: '👑', title: 'Legend', threshold: 500 }
  };
  export const TEMPLATES = [
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
  export const QUOTES = [
    "Every compliment is a seed of kindness.",
    "Your words have the power to change someone's day.",
    "Keep spreading positivity!",
    "One compliment at a time makes the world brighter.",
    "You're a beacon of kindness!",
    "Thank you for being so caring.",
    "Your compassion matters more than you know.",
    "Never underestimate the power of kind words."
  ];
