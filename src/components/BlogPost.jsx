import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="blog-post">
        <div className="blog-post-container">
          <h2>Post not found</h2>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post">
      <div className="blog-post-container">
        <Link to="/" className="back-link">← Back to Home</Link>
        <article className="post">
          <header className="post-header">
            <span className="post-category">{post.category}</span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="post-author">By {post.author}</span>
              <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="post-read-time">{post.readTime}</span>
            </div>
          </header>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
        </article>
      </div>
    </div>
  )
}

function formatContent(content) {
  // Simple markdown-like formatting
  return content
    .split('\n')
    .map(line => {
      // Handle images: ![alt text](image-url)
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
      if (imageMatch) {
        const alt = imageMatch[1] || ''
        const url = imageMatch[2]
        return `<img src="${url}" alt="${alt}" class="post-image" />`
      }
      // Handle headings
      if (line.startsWith('# ')) {
        return `<h1>${line.substring(2)}</h1>`
      } else if (line.startsWith('## ')) {
        return `<h2>${line.substring(3)}</h2>`
      } else if (line.startsWith('### ')) {
        return `<h3>${line.substring(4)}</h3>`
      } else if (line.startsWith('- ')) {
        return `<li>${line.substring(2)}</li>`
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return `<p><strong>${line.substring(2, line.length - 2)}</strong></p>`
      } else if (line.trim() === '') {
        return '<br />'
      } else {
        return `<p>${line}</p>`
      }
    })
    .join('')
    .replace(/(<li>.*<\/li>)/g, (match) => {
      if (!match.includes('<ul>')) {
        return `<ul>${match}</ul>`
      }
      return match
    })
}

export default BlogPost

