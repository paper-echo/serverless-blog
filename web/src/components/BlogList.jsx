import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function BlogList() {
  return (
    <div className="blog-list">
      <div className="blog-list-container">
        <h2 className="page-title">Latest Posts</h2>
        <div className="posts-grid">
          {blogPosts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} className="post-card">
              <article className="post-card-content">
                <span className="post-category">{post.category}</span>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span className="post-author">{post.author}</span>
                  <span className="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="post-read-time">{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogList

