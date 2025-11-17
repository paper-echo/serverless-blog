import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Serverless Blog</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

