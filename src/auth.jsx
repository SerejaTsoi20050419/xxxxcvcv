import React, { createContext, useContext, useState } from 'react'
const AuthContext = createContext()

export function AuthProvider({children}){
  const existing = JSON.parse(localStorage.getItem('sb_user')||'null')
  const [user, setUser] = useState(existing)
  function login(username){
    const u = {username}
    setUser(u)
    localStorage.setItem('sb_user', JSON.stringify(u))
  }
  function logout(){
    setUser(null)
    localStorage.removeItem('sb_user')
  }
  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

export function useAuth(){ return useContext(AuthContext) }
