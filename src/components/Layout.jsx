import Header from './Header'

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Serverless Blog. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout

