import React, { useState, useEffect } from 'react'

import { useSelector } from '../../../../context/hooks/use-selector'
import { Column, DraftColumn } from '../../types/column'
import { getColumnById } from '../../selectors/column'
import { Modal } from '../../../shared/components/modal/Modal'

interface Props {
  onCreate: (data: DraftColumn) => void
  onEdit: (data: DraftColumn) => void
  onClose: () => void
  id: number | null
}

export const ManageColumnModal = ({ onCreate, onEdit, onClose, id }: Props) => {
  const [label, setLabel] = useState<string>('')
  const [color, setColor] = useState<string>('#000000')
  const column = useSelector<Column | undefined>((state) =>
    getColumnById(state, id)
  )
  useEffect(() => {
    if (!column) {
      return
    }

    setLabel(column.label)
    setColor(column.color)
  }, [column])

  const isNew = !column
  const handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLabel(event.target.value)
  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) =>
    setColor(event.target.value)
  const isDisabled = label.trim().length === 0
  const title = isNew ? 'Create New Column' : 'Edit Column'
  const submitButtonText = isNew ? 'Create' : 'Update'
  const submitAction = isNew ? onCreate : onEdit
  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    submitAction({ label, color })
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div>
        <input
          type="text"
          value={label}
          name="column-label"
          onChange={handleChangeLabel}
        />
        <input
          type="color"
          value={color}
          name="column-color"
          onChange={handleChangeColor}
        />
      </div>
      <div>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" onClick={handleSubmit} disabled={isDisabled}>
          {submitButtonText}
        </button>
      </div>
    </Modal>
  )
}
