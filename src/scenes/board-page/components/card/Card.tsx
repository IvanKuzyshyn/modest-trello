import React, { useState } from 'react'
import './Card.css'

import { DeleteConfirmation } from "./DeleteConfirmation";

interface Props {
    id: number,
  name: string
  onEdit: () => void
}

export const Card = ({ id, name, onEdit }: Props) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(false)
    const [isShownConfirmation, showConfirmation] = useState<boolean>(false)

  return (
    <div className="card">
      <h4>{name}</h4>
      <div className="card card-controls">
        <button onClick={() => setCollapsed((collapsed) => !collapsed)}>
          {isCollapsed ? 'Less' : 'More'}
        </button>
        {isCollapsed && (
          <div>
            <button data-testid="card-edit" onClick={onEdit}>
              &#9998;
            </button>
            <button data-testid="card-delete" onClick={() => showConfirmation(true)}>
              &#10006;
            </button>
          </div>
        )}
      </div>
        <DeleteConfirmation
            id={id}
            isVisible={isShownConfirmation}
            onClose={() => showConfirmation(false)}
        />
    </div>
  )
}
