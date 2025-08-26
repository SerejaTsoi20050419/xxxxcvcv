import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getArticle, deleteArticle } from '../api'
import ConfirmModal from '../components/ConfirmModal'
import { useAuth } from '../auth'

export default function ArticleView(){
  const { slug } = useParams()
  const nav = useNavigate()
  const [article, setArticle] = useState(null)
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  useEffect(()=>{ getArticle(slug).then(setArticle) },[slug])

  async function handleDelete(){
    try{
      await deleteArticle(slug)
      setOpen(false)
      nav('/')
    }catch(e){
      alert('Delete failed: '+e.message)
    }
  }

  if(!article) return <div>Loading...</div>

  const canEdit = user && user.username === article.author?.username

  return (
    <div>
      <h2>{article.title}</h2>
      <p><em>{article.description}</em></p>
      <div style={{whiteSpace:'pre-wrap', marginTop:12}}>{article.body}</div>
      <div style={{marginTop:12}}>
        <small>by {article.author?.username || 'Unknown'}</small>
      </div>

      <div className="actions" style={{marginTop:16}}>
        {canEdit && <Link to={'/articles/'+slug+'/edit'}><button>Edit</button></Link>}
        {canEdit && <button className="btn-danger" onClick={()=>setOpen(true)}>Delete</button>}
      </div>

      <ConfirmModal open={open} title="Delete article?" onCancel={()=>setOpen(false)} onConfirm={handleDelete}>
        Are you sure you want to delete this article? This action cannot be undone.
      </ConfirmModal>
    </div>
  )
}
