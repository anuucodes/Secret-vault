// src/App.jsx
import React, { useState, useEffect } from 'react'
import Auth from './components/Auth'
import Notes from './components/Notes'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  // 👇 Restore login session from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('secretUser')
    if (saved) setCurrentUser(saved)
  }, [])

  // 👇 Save or clear user in sessionStorage
  useEffect(() => {
    if (currentUser) sessionStorage.setItem('secretUser', currentUser)
    else sessionStorage.removeItem('secretUser')
  }, [currentUser])

  return (
    <div className="app-root">
      {!currentUser ? (
        <Auth onLogin={setCurrentUser} />
      ) : (
        <Notes userId={currentUser} onLogout={() => setCurrentUser(null)} />
      )}
    </div>
  )
}