// src/components/Notes.jsx
import React, { useState, useEffect, useRef } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

import NoteCard from './NotesCard'

export default function Notes({ userId, onLogout }) {
  const [title, setTitle] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [notes, setNotes] = useState([])
  const fileRef = useRef()

  // 📡 Real-time listener for notes
  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      const arr = []
      snapshot.forEach((d) => arr.push({ id: d.id, ...d.data() }))
      setNotes(arr.filter((n) => n.userId === userId))
    })
    return () => unsub()
  }, [userId])

  const handleFileChange = (e) => {
    if (e.target.files.length) setUploadedFile(e.target.files[0])
  }

  // ✨ Add note to Firestore
  async function handleAdd() {
    const t = title.trim()
    if (!t && !uploadedFile) return

    if (uploadedFile) {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = reader.result
        await addDoc(collection(db, 'notes'), {
          userId,
          title: t,
          file: base64,
          fileName: uploadedFile.name,
          fileType: uploadedFile.type,
          createdAt: serverTimestamp(),
        })
        setTitle('')
        setUploadedFile(null)
        fileRef.current.value = ''
      }
      reader.readAsDataURL(uploadedFile)
    } else {
      await addDoc(collection(db, 'notes'), {
        userId,
        title: t,
        file: null,
        fileName: null,
        fileType: null,
        createdAt: serverTimestamp(),
      })
      setTitle('')
    }
  }

  // 🗑️ Delete note
  async function handleDelete(noteId) {
    await deleteDoc(doc(db, 'notes', noteId))
  }

  return (
    <div className="notes-root">
      <div className="notes-header">
        <h1>📝 Your Secret Notes Vault</h1>
        <button onClick={onLogout}>👋 Log Out</button>
      </div>

      <div className="notes-form">
        <input
          type="text"
          placeholder="What's this masterpiece called? 🖌️"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input ref={fileRef} type="file" onChange={handleFileChange} />
        <button onClick={handleAdd}>✨ Save Note ✨</button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet, Agent!</p>
        ) : (
          notes.map((n) => <NoteCard key={n.id} note={n} onDelete={() => handleDelete(n.id)} />)
        )}
      </div>
    </div>
  )
}
