import { Link } from 'react-router-dom'
import { blogPosts } from '../data/posts'

function Home() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })

  return (
    <>
      {/* Page Header */}
      <header className="masthead" style={{ backgroundImage: "url('/assets/img/home-bg.jpg')" }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Clean Blog</h1>
                <span className="subheading">A Blog Theme by Start Bootstrap</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {sortedPosts.map((post, index) => (
              <div key={post.id}>
                {/* Post preview */}
                <div className="post-preview">
                  <Link to={`/post/${post.id}`}>
                    <h2 className="post-title">{post.title}</h2>
                    {post.subtitle && <h3 className="post-subtitle">{post.subtitle}</h3>}
                  </Link>
                  <p className="post-meta">
                    Posted by
                    <a href="#!"> {post.author}</a>
                    on {post.date}
                  </p>
                </div>
                {/* Divider - don't show after last post */}
                {index < sortedPosts.length - 1 && <hr className="my-4" />}
              </div>
            ))}
            {/* Pager */}
            <div className="d-flex justify-content-end mb-4">
              <a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

