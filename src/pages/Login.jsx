import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth'

export default function Login(){
  const [username, setUsername] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/'

  function submit(e){
    e.preventDefault()
    if(!username.trim()) return alert('Enter username')
    login(username.trim())
    nav(from, {replace:true})
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="actions">
          <button className="btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
