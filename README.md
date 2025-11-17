# Serverless Blog

A modern, beautiful blog application built with React.js, featuring a clean UI and smooth navigation.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly layout
- 🚀 Fast and lightweight
- 📝 Sample blog posts included
- 🔗 React Router for navigation
- 💅 Beautiful gradient styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
serverless-blog/
├── src/
│   ├── components/
│   │   ├── BlogList.jsx      # Blog post listing page
│   │   ├── BlogPost.jsx      # Individual blog post page
│   │   ├── Header.jsx        # Navigation header
│   │   └── Layout.jsx        # Main layout wrapper
│   ├── data/
│   │   └── blogPosts.js      # Sample blog posts data
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Adding New Blog Posts

Edit `src/data/blogPosts.js` and add new post objects with the following structure:

```javascript
{
  id: 5,
  title: "Your Post Title",
  author: "Author Name",
  date: "2024-02-15",
  excerpt: "A brief description of your post",
  content: "Your full post content here...",
  category: "Category Name",
  readTime: "5 min read"
}
```

## Technologies Used

- React 18
- React Router DOM
- Vite
- CSS3 (with CSS Variables)

## License

MIT