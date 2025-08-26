import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { getArticle, updateArticle } from '../api'

export default function EditArticle(){
  const { slug } = useParams()
  const nav = useNavigate()
  const [initial, setInitial] = useState(null)

  useEffect(()=>{
    getArticle(slug).then(a=>{
      if(!a) return nav('/')
      setInitial({title:a.title, description:a.description, body:a.body})
    })
  },[slug])

  async function submit(data){
    try{
      await updateArticle(slug, data)
      nav('/articles/'+slug)
    }catch(e){
      alert('Update failed: '+e.message)
    }
  }

  if(!initial) return <div>Loading...</div>

  return (
    <div>
      <h2>Edit Article</h2>
      <ArticleForm initial={initial} onSubmit={submit} />
    </div>
  )
}
