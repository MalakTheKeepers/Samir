# Samir - Recycling & Sustainability Platform

A comprehensive web platform focused on environmental sustainability, recycling education, and community engagement for Alexandria, Egypt.

## 🌟 Features

### 🏠 **Homepage**
- Modern blue neon-themed UI design
- Interactive navigation with smooth scrolling
- Project showcase and about us sections
- User authentication (sign-in/sign-up)
- Language support (English/Arabic)

### ♻️ **Recycling Calculator**
- Calculate recycling points for various materials:
  - Plastic bags, bottles, and toys
  - Aluminum cans and metal items
  - Weight-based calculations
- QR code generation for recycling reports
- Profile integration for point tracking

### 🤖 **AI Chatbot**
- Interactive chatbot with educational content
- Quiz system with multiple topics:
  - Basic Mathematics
  - Science Fundamentals
  - Alexandria Climate & Sustainability (Arabic)
- Score tracking and progress monitoring

### 👤 **User Profile**
- Personal statistics dashboard
- Recycling points and items tracking
- Quiz scores and learning progress
- Days active counter
- Settings management

### 🗺️ **Interactive Map**
- Alexandria flood risk visualization
- Climate change impact mapping
- Heritage site protection zones

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/samir-platform.git
   cd samir-platform
   ```

2. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
samir-platform/
├── index.html              # Main homepage
├── about_ar.html           # Arabic about page
├── calc/
│   └── index.html          # Recycling calculator
├── chatbot/
│   ├── index.html          # Chatbot interface
│   ├── static/
│   │   ├── index.html      # Chatbot main page
│   │   ├── style.css       # Chatbot styles
│   │   └── script.js      # Chatbot functionality
│   └── data/
│       ├── chatbot_data.json # Quiz and text data
│       └── faiss_index/    # AI search index
├── images/                 # Project assets
└── README.md              # This file
```

## 🎨 Design Features

- **Blue Neon Theme**: Modern, eye-catching design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader support
- **Multilingual**: English and Arabic language support

## 🔧 Technical Details

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for user data and statistics
- **AI Integration**: FAISS vector search for chatbot responses
- **QR Codes**: Dynamic QR code generation for recycling reports
- **No Backend Required**: Fully client-side application

## 🌍 Environmental Impact

This platform addresses critical environmental challenges in Alexandria:

- **Climate Change**: Interactive mapping of flood risks
- **Plastic Pollution**: Educational content and recycling incentives
- **Heritage Protection**: Awareness of climate threats to historical sites
- **Community Engagement**: Gamified recycling and learning system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Project Lead**: Samir Team
- **Email**: contact@samir-platform.com
- **Website**: [samir-platform.github.io](https://samir-platform.github.io)

## 🙏 Acknowledgments

- Alexandria University for research support
- Local environmental organizations
- Community volunteers and beta testers

---

**Made with ❤️ for Alexandria's sustainable future**
