# 🐾 Compliment Pet

A delightful web app that encourages daily kindness through a virtual pet companion. Write compliments, build streaks, unlock achievements, and watch your pet thrive!

![Compliment Pet Hero](https://img.shields.io/badge/Made%20with-💖-ff6b9d?style=for-the-badge)
![Built with Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-ffd93d?style=for-the-badge&logo=javascript)
![No Dependencies](https://img.shields.io/badge/Dependencies-ZERO-48dbfb?style=for-the-badge)

## ✨ Features

- **📝 Daily Compliments** - Write one heartfelt compliment per day
- **🔥 Streak System** - Build consecutive day streaks and track your best
- **🏆 Achievements** - Unlock 6 unique SVG badges as you progress
- **😊 Pet Moods** - Watch your pet's mood change based on your activity
- **🎨 Pet Skins** - Choose from 6 different pet appearances (😊🐱🐶🐰🦊🐻)
- **📊 Statistics** - Track total compliments, streaks, and weekly progress
- **📋 History** - View all past compliments with timestamps
- **💾 Export Data** - Download your data as JSON
- **🎵 Sound Effects** - Optional audio feedback (Web Audio API)
- **🌙 Theme Toggle** - Switch between dark and light modes
- **🎉 Confetti Animation** - Celebrate each compliment with particle effects
- **📱 Fully Responsive** - Works beautifully on mobile, tablet, and desktop
- **🔒 Privacy First** - All data stored locally (localStorage), no tracking

## 🚀 Demo

**[Live Demo](https://your-username.github.io/compliment-pet/)**

## 🎮 How to Play

1. **Write a compliment** - Type at least 10 characters about yourself or someone else
2. **Submit daily** - Give your pet one compliment per day to keep them happy
3. **Build streaks** - Compliment consecutively to increase your streak
4. **Unlock achievements** - Reach milestones to earn special badges
5. **Level up your pet** - Gain experience points with each compliment

## 🏆 Achievements

| Badge | Name | Requirement |
|-------|------|-------------|
| 🎉 | First Compliment | 10 total compliments |
| 💯 | Century | 100 total compliments |
| 🔥 | Week Streak | 7-day consecutive streak |
| 🌟 | Month Streak | 30-day consecutive streak |
| 💖 | Kind Heart | 50 total compliments |
| 👑 | Legendary | 500 total compliments |

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with custom SVG graphics
- **CSS3** - Gradients, animations, flexbox, CSS Grid
- **Vanilla JavaScript** - ES6 classes, localStorage API, Canvas API, Web Audio API
- **No frameworks** - Zero dependencies, pure web technologies
- **No backend** - Fully client-side, works offline

## 📦 Installation

### Option 1: Direct Download
```bash
# Download or clone the repository
git clone https://github.com/bibashjaprel/compliment-pet.git
cd compliment-pet

# Open index.html in your browser
# No build process needed!
```

### Option 2: Run Locally with Live Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Then open http://localhost:8000
```

### Option 3: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be live at `https://your-username.github.io/compliment-pet/`

## 📁 Project Structure

```
compliment-pet/
├── index.html          # Main HTML structure
├── style.css           # Complete styling (2000+ lines)
├── script.js           # Game logic (600+ lines)
└── README.md           # Documentation
```

## 🎨 Design Philosophy

Built with the **Hack Club / Hacktober Hub** aesthetic:
- 🌈 Vibrant gradients (pink, yellow, cyan)
- 🎭 Playful Comic Sans font
- ✨ Smooth animations with cubic-bezier easing
- 🎯 Dark theme with colorful accents
- 💫 Micro-interactions on every element

## 💾 Data Storage

All data is stored in browser localStorage with the `cp_` prefix:

```javascript
cp_lastComplimentDate    // Last compliment date (YYYY-MM-DD)
cp_lastComplimentText    // Most recent compliment
cp_streak                // Current consecutive days
cp_bestStreak            // Personal best streak
cp_totalCompliments      // Lifetime count
cp_complimentHistory     // Array of all compliments
cp_petSkin               // Selected pet emoji
cp_petLevel              // Current level
cp_petExp                // Experience points
cp_soundEnabled          // Audio preference
cp_achievements          // Unlocked badges
```

## 🔧 Customization

### Add New Pet Skins
Edit the pet skin buttons in `index.html`:
```html
<button class="skin-btn" data-skin="🦄" title="Unicorn">🦄</button>
```

### Modify Achievement Thresholds
Edit the `ACHIEVEMENTS` object in `script.js`:
```javascript
const ACHIEVEMENTS = {
  'firstCompliment': { emoji: '🎉', title: '10 compliments', threshold: 10 },
  // Add or modify achievements here
};
```

### Change Color Scheme
Update CSS variables or gradient colors in `style.css`:
```css
/* Primary pink */
#ff6b9d

/* Accent yellow */
#ffd93d

/* Cyan highlights */
#48dbfb
```

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- [ ] Add more achievement types
- [ ] Implement pet animations with CSS/SVG
- [ ] Create more compliment templates
- [ ] Add seasonal themes
- [ ] Implement data import feature
- [ ] Add social sharing for streaks
- [ ] Create PWA manifest for mobile install

**To contribute:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - feel free to use it for personal or commercial projects!

## 🌟 Acknowledgments

- Inspired by **Hack Club**'s playful, creative spirit
- Built with love for mental health and positivity
- Thanks to everyone who believes in the power of kind words

## 📞 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/your-username/compliment-pet](https://github.com/your-username/compliment-pet)

---

<div align="center">

**Made with 💜 | Spread kindness daily! | [⭐ Star this repo](https://github.com/your-username/compliment-pet)**

</div>
