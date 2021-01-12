import React, { useState, useEffect } from 'react'

import { ColumnSelector } from '../column/ColumnSelector'
import { Modal } from '../../../shared/components/modal/Modal'
import { useSelector } from '../../../../context/hooks/use-selector'
import { getCardById } from '../../selectors/card'
import { Card, DraftCard } from '../../types/card'

interface Props {
  onCreate: (data: DraftCard) => void
  onEdit: (data: DraftCard) => void
  onClose: () => void
  parentColumnId: number
  id: number | null
}

export const ManageCardModal = ({
  onCreate,
  onEdit,
  onClose,
  parentColumnId,
  id,
}: Props) => {
  const [name, setName] = useState('')
  const [column, setColumn] = useState(parentColumnId)
  const card = useSelector<Card | undefined>((state) => getCardById(state, id))

  useEffect(() => {
    if (!column && parentColumnId !== column) {
      setColumn(parentColumnId)
    }
  }, [parentColumnId, column])

  useEffect(() => {
    if (!card) {
      return
    }

    setName(card.name)
    setColumn(card.columnId)
  }, [card])

  const isNew = !card
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)
  const handleChangeColumn = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setColumn(Number(event.target.value))
  const isDisabled = name.trim().length === 0
  const title = isNew ? 'Create New Card' : 'Edit Card'
  const submitButtonText = isNew ? 'Create' : 'Update'
  const submitAction = isNew ? onCreate : onEdit
  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    submitAction({ name, columnId: column })
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div>
        <input
          type="text"
          value={name}
          name="column-label"
          onChange={handleChangeName}
        />
        <ColumnSelector value={column} onChange={handleChangeColumn} />
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
