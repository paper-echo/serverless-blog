import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Navbar() {
  const location = useLocation()

  useEffect(() => {
    // Initialize Bootstrap navbar collapse
    const navbarToggler = document.querySelector('.navbar-toggler')
    const navbarCollapse = document.querySelector('.navbar-collapse')
    
    if (navbarToggler && navbarCollapse) {
      navbarToggler.addEventListener('click', () => {
        navbarCollapse.classList.toggle('show')
      })
    }

    // Scroll behavior script
    let scrollPos = 0
    const mainNav = document.getElementById('mainNav')
    if (mainNav) {
      const headerHeight = mainNav.clientHeight
      const handleScroll = () => {
        const currentTop = document.body.getBoundingClientRect().top * -1
        if (currentTop < scrollPos) {
          // Scrolling Up
          if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
            mainNav.classList.add('is-visible')
          } else {
            mainNav.classList.remove('is-visible', 'is-fixed')
          }
        } else {
          // Scrolling Down
          mainNav.classList.remove('is-visible')
          if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
            mainNav.classList.add('is-fixed')
          }
        }
        scrollPos = currentTop
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/">Start Bootstrap</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto py-4 py-lg-0">
            <li className="nav-item">
              <Link className={`nav-link px-lg-3 py-3 py-lg-4 ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-lg-3 py-3 py-lg-4 ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-lg-3 py-3 py-lg-4 ${location.pathname === '/post' ? 'active' : ''}`} to="/post">Sample Post</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-lg-3 py-3 py-lg-4 ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

