import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/posts'

function Post() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <h2>Post not found</h2>
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Page Header */}
      <header className="masthead" style={{ backgroundImage: `url('${post.backgroundImage}')` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>{post.title}</h1>
                {post.subtitle && <h2 className="subheading">{post.subtitle}</h2>}
                <span className="meta">
                  Posted by
                  <a href="#!"> {post.author}</a>
                  on {post.date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Post Content */}
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </article>
    </>
  )
}

export default Post

