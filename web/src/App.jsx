import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/post/:id" element={<BlogPost />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

