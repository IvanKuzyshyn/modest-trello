import React, { useEffect, useState } from 'react'
import { useSelector } from '../../../../context/hooks/use-selector'
import {
  getCardById,
  getManagingCardColumnId,
  getManagingCardId,
  isCardManagerShown,
} from '../../selectors/card'
import { useAction } from '../../../../context/hooks/use-action'
import { StateAction } from '../../../../context/types/state'
import { Modal } from '../../../shared/components/modal/Modal'
import { ColumnSelector } from '../column/ColumnSelector'

export const ManageCardModal = () => {
  const isShown = useSelector(isCardManagerShown)
  const id = useSelector(getManagingCardId)
  const columnId = useSelector(getManagingCardColumnId)
  const card = useSelector((state) => getCardById(state, id))
  const [name, setName] = useState('')
  const [column, setColumn] = useState(columnId)
  const setCardManager = useAction(StateAction.SET_CARD_MANAGER)
  const createCard = useAction(StateAction.CREATE_CARD)
  const editCard = useAction(StateAction.EDIT_CARD)

  useEffect(() => {
    if (!column && columnId !== column) {
      setColumn(columnId)
    }
  }, [columnId, column])

  useEffect(() => {
    if (!card) {
      return
    }

    setName(card.name)
    setColumn(card.columnId)
  }, [card])

  if (!isShown) {
    return null
  }

  const isNew = !card
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)
  const handleChangeColumn = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setColumn(Number(event.target.value))
  const isDisabled = name.trim().length === 0
  const title = isNew ? 'Create New Card' : 'Edit Card'
  const submitButtonText = isNew ? 'Create' : 'Update'
  const handleClose = () => {
    setCardManager({ id: null, isShown: false, columnId: null })
    setName('')
    setColumn(null)
  }
  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    const data = { name, columnId: column }
    card ? editCard(card.id, data) : createCard(data)
    handleClose()
  }

  return (
    <Modal title={title} onClose={handleClose}>
      <div>
        <input
          type="text"
          value={name}
          name="column-label"
          onChange={handleChangeName}
        />
        <ColumnSelector value={column || ''} onChange={handleChangeColumn} />
      </div>
      <div>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" onClick={handleSubmit} disabled={isDisabled}>
          {submitButtonText}
        </button>
      </div>
    </Modal>
  )
}
