import React, {useState} from 'react'

export default function ArticleForm({initial = {title:'',description:'',body:''}, onSubmit}){
  const [title, setTitle] = useState(initial.title)
  const [description, setDescription] = useState(initial.description)
  const [body, setBody] = useState(initial.body)
  const [errors, setErrors] = useState({})

  function validate(){
    const e = {}
    if(!title.trim()) e.title = 'Title is required'
    if(!description.trim()) e.description = 'Description is required'
    if(!body.trim()) e.body = 'Body is required'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!validate()) return
    onSubmit({title:title.trim(), description:description.trim(), body:body.trim()})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>
      <div className="form-row">
        <label>Description</label>
        <input value={description} onChange={e=>setDescription(e.target.value)} />
        {errors.description && <div className="error">{errors.description}</div>}
      </div>
      <div className="form-row">
        <label>Body</label>
        <textarea rows="8" value={body} onChange={e=>setBody(e.target.value)} />
        {errors.body && <div className="error">{errors.body}</div>}
      </div>
      <div className="actions">
        <button className="btn-primary" type="submit">Save</button>
      </div>
    </form>
  )
}
