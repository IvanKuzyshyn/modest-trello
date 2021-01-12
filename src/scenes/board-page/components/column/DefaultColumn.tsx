import React from 'react'
import './Column.css'

interface Props {
    onCreateColumn: () => void,
}

export const DefaultColumn = ({ onCreateColumn }: Props) => (
    <div
        className="column column--default"
        role="button"
        onClick={onCreateColumn}
    >
        Add new Column
    </div>
)
