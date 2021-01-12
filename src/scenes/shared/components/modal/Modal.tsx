import React, { useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'

import './Modal.css'

interface Props {
  title: string
  children: React.ReactNode
  onClose: () => void
}

const root = document.getElementById('portals-root')

export const Modal = ({ title, children, onClose }: Props) => {
  const element = useMemo(() => document.createElement('div'), [])
  element.classList.add('modal-container')

  useEffect(() => {
    if (!root) {
      throw new Error('No root found for modal!')
    }

    root.appendChild(element)
    return () => {
      root.removeChild(element)
    }
  }, [element])

  return createPortal(
    <div className="modal-content">
      <header className="modal-header">
        {title}
        <button onClick={onClose}>&#10006;</button>
      </header>
      <section className="modal-body">{children}</section>
    </div>,
    element
  )
}
