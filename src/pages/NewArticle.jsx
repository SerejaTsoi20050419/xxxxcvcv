import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { createArticle } from '../api'
import { useAuth } from '../auth'

export default function NewArticle(){
  const nav = useNavigate()
  const { user } = useAuth()

  async function submit(data){
    try{
      const article = await createArticle({...data, author: user})
      nav('/articles/'+article.slug)
    }catch(e){
      alert('Failed: '+e.message)
    }
  }

  return (
    <div>
      <h2>New Article</h2>
      <ArticleForm onSubmit={submit} />
    </div>
  )
}
