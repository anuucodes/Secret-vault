// src/components/NoteCard.jsx
import React from 'react'

export default function NoteCard({ note, onDelete }) {
  const { title, file, fileName, fileType, createdAt } = note

  const handleDownload = () => {
    if (!file) return
    const a = document.createElement('a')
    a.href = file
    a.download = fileName || 'download'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="note-card">
      {title && <h4>{title}</h4>}

      {/* Show image if uploaded */}
      {file && fileType?.startsWith('image/') ? (
        <img src={file} alt={title || 'image'} />
      ) : file ? (
        <div className="file-preview">📄 {fileName}</div>
      ) : null}

      <div className="note-actions">
        {file && <button onClick={handleDownload}>Download</button>}
        <button onClick={onDelete}>Delete</button>
      </div>

      <div className="timestamp">
        {createdAt?.toDate ? createdAt.toDate().toLocaleString() : ''}
      </div>
    </div>
  )
}
