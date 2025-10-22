// src/components/Auth.jsx
import React, { useState } from 'react'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'


export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login') // 'login' or 'signup'
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)

  const clear = () => setCode('')

  // ✨ Signup function
  async function handleSignup() {
    if (!code.trim()) return alert('Enter a secret code!')
    setBusy(true)
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('id', '==', code))
      const snap = await getDocs(q)
      if (!snap.empty) return alert('🚫 Code already taken!')

      await addDoc(usersRef, { id: code })
      alert('✅ Signup successful! Now log in.')
      setMode('login')
      clear()
    } catch (e) {
      console.error(e)
      alert('Error signing up!')
    }
    setBusy(false)
  }

  // 🔑 Login function
  async function handleLogin() {
    if (!code.trim()) return alert('Enter your secret code!')
    setBusy(true)
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('id', '==', code))
      const snap = await getDocs(q)
      if (snap.empty) return alert('😬 No account found! Please sign up.')
      onLogin(code)
    } catch (e) {
      console.error(e)
      alert('Login failed!')
    }
    setBusy(false)
  }

  return (
    <div className="auth-card">
      <h2>{mode === 'login' ? 'Welcome Back, Secret Agent 🕵️‍♂️' : 'Create Your Secret Identity 🧙‍♂️'}</h2>
      <input
        type="password"
        placeholder="Enter secret code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="auth-actions">
        {mode === 'login' ? (
          <>
            <button onClick={handleLogin} disabled={busy}>Let Me In 🔐</button>
            <p>
              No secret code yet?{' '}
              <span onClick={() => { setMode('signup'); clear() }}>Get One 🚀</span>
            </p>
          </>
        ) : (
          <>
            <button onClick={handleSignup} disabled={busy}>Join the Club 📝</button>
            <p>
              Already a spy?{' '}
              <span onClick={() => { setMode('login'); clear() }}>Login Here 🔓</span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
