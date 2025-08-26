import React from 'react'

export default function ConfirmModal({open, title='Confirm', children, onCancel, onConfirm}){
  if(!open) return null
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>
        <div>{children}</div>
        <div style={{marginTop:12, display:'flex', justifyContent:'flex-end', gap:8}}>
          <button onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
