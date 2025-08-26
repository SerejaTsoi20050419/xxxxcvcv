import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NewArticle from './pages/NewArticle'
import EditArticle from './pages/EditArticle'
import ArticleView from './pages/ArticleView'
import { AuthProvider, useAuth } from './auth'
import PrivateRoute from './components/PrivateRoute'

export default function App(){
  return (
    <AuthProvider>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-article" element={
            <PrivateRoute><NewArticle/></PrivateRoute>
          } />
          <Route path="/articles/:slug/edit" element={
            <PrivateRoute><EditArticle/></PrivateRoute>
          } />
          <Route path="/articles/:slug" element={<ArticleView/>} />
          <Route path="*" element={<h2>Not Found</h2>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

function Header(){
  const { user, logout } = useAuth()
  return (
    <header className="header">
      <Link to="/"><h1>Simple Blog</h1></Link>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/new-article">New Article</Link>
            <button className="linkish" onClick={logout}>Logout</button>
            <span className="user">Signed in as {user.username}</span>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  )
}
