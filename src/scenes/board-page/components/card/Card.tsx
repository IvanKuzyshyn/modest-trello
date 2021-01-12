import React, { useState } from 'react'
import './Card.css'

interface Props {
    name: string,
    onDelete: () => void,
    onEdit: () => void,
}

export const Card = ({ name, onDelete, onEdit }: Props) => {
    const [isCollapsed, setCollapsed] = useState<boolean>(false)

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
                        <button data-testid="card-delete" onClick={onDelete}>
                            &#10006;
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
