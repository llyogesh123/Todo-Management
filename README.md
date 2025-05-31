# TaskFlow - Modern React Todo App 🚀

A beautiful, feature-rich todo application built with React and styled with Tailwind CSS. TaskFlow combines stunning visual design with powerful functionality to make task management both efficient and enjoyable.

## ✨ Features

### 🎯 Core Functionality
- **Add Tasks**: Create new tasks with instant validation
- **Mark Complete**: Toggle task completion with satisfying animations
- **Delete Tasks**: Remove unwanted tasks with smooth transitions
- **Real-time Updates**: See changes instantly with responsive UI

### 🔍 Advanced Filters & Sorting
- **Smart Filtering**: View All, Active, or Completed tasks
- **Multiple Sort Options**: 
  - Newest First (default)
  - Oldest First
  - Alphabetical (A-Z)
  - Completed Last

### 📊 Progress Tracking
- **Visual Progress Bar**: Animated completion percentage
- **Live Statistics**: Total, completed, and active task counts
- **Achievement Tracking**: Watch your productivity grow

### 🎨 Modern UI/UX
- **Glass Morphism Design**: Frosted glass effects with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-to-indigo gradients
- **Smooth Animations**: Hover effects and micro-interactions
- **Responsive Layout**: Works perfectly on all device sizes
- **Dark Theme**: Easy on the eyes with vibrant accent colors

### 🛡️ Input Validation
- Empty task prevention
- Minimum length validation (2+ characters)
- Maximum length limit (100 characters)
- Duplicate task detection
- Real-time error feedback

### 💾 Data Persistence
- LocalStorage integration (easily configurable)
- Session-based storage for development
- Automatic save/restore functionality

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/llyogesh123/Todo-Management.git
   cd taskflow-todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.0.0"
  }
}
```

## 🏗️ Project Structure

```
taskflow-todo/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Enable LocalStorage (Production)

To enable persistent storage, uncomment these lines in `TodoApp.jsx`:

```javascript
// Load tasks on mount
useEffect(() => {
  const savedTasks = localStorage.getItem('todoTasks');
  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);

// Save tasks on change
useEffect(() => {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}, [tasks]);
```

### Tailwind CSS Setup

Ensure your `tailwind.config.js` includes:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
```

## 🧪 Testing

### Manual Testing Checklist

#### Input Validation
- [ ] Empty input shows error message
- [ ] Single character input shows error
- [ ] Duplicate task shows error message
- [ ] Long text (100+ chars) shows error
- [ ] Valid input clears previous errors

#### Task Operations
- [ ] Add task with Enter key
- [ ] Add task with button click
- [ ] Mark task as complete/incomplete
- [ ] Delete individual tasks
- [ ] Clear all completed tasks

#### Filtering & Sorting
- [ ] "All" filter shows all tasks
- [ ] "Active" filter shows incomplete tasks
- [ ] "Completed" filter shows completed tasks
- [ ] Sort by newest/oldest works
- [ ] Alphabetical sorting works
- [ ] "Completed Last" sorting works

#### UI/UX
- [ ] Animations are smooth
- [ ] Hover effects work correctly
- [ ] Progress bar updates accurately
- [ ] Statistics display correctly
- [ ] Responsive design on mobile

### Automated Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

For test coverage:
```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📱 Browser Support

- ✅ Chrome (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Edge (90+)

## 🎨 Customization

### Color Themes
Modify the gradient colors in the component:
```javascript
// Background gradient
className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"

// Button gradients
className="bg-gradient-to-r from-pink-500 to-violet-500"
```

### Animation Speed
Adjust transition durations:
```javascript
className="transition-all duration-300" // Fast
className="transition-all duration-500" // Medium  
className="transition-all duration-700" // Slow
```

## 🚀 Deployment

### Vercel
1. Import project from GitHub
2. Vercel will auto-detect React app
3. Deploy with default settings

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design
- Test across different browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide React** - For the beautiful icons
- **Inspiration** - Modern productivity apps and glass morphism trends

## 📞 Support

Having issues? We're here to help!

- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/taskflow-todo/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/yourusername/taskflow-todo/discussions)
- 📧 **Email**: support@taskflow.com

## 🎯 Roadmap

- [ ] **Dark/Light Theme Toggle**
- [ ] **Task Categories/Tags**
- [ ] **Due Dates & Reminders**
- [ ] **Drag & Drop Reordering**
- [ ] **Export/Import Tasks**
- [ ] **Collaborative Features**
- [ ] **Mobile App (React Native)**

---

<div align="center">

**Built with ❤️ by [Yogeshwaran](https://github.com/llyogesh123)**

</div>
