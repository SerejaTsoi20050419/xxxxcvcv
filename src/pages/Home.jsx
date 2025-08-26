import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { listArticles } from '../api'

export default function Home(){
  const [articles, setArticles] = useState([])

  useEffect(()=>{ listArticles().then(setArticles) },[])

  return (
    <div>
      <h2>Articles</h2>
      {articles.length===0 && <p>No articles yet. Create one!</p>}
      {articles.map(a=>(
        <div className="article" key={a.slug}>
          <h3><Link to={'/articles/'+a.slug}>{a.title}</Link></h3>
          <p>{a.description}</p>
          <small>by {a.author?.username || 'Unknown'}</small>
        </div>
      ))}
    </div>
  )
}
