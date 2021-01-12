import React from 'react'

import { useSelector } from '../../../../context/hooks/use-selector'
import { getColumnById } from '../../selectors/column'
import { Modal } from '../../../shared/components/modal/Modal'
import { useAction } from '../../../../context/hooks/use-action'
import { StateAction } from '../../../../context/types/state'

interface Props {
  id: number | null
  onClose: () => void
  isVisible: boolean
}

export const DeleteConfirmation = ({ id, onClose, isVisible }: Props) => {
  const column = useSelector((state) => getColumnById(state, id))
  const deleteColumn = useAction(StateAction.DELETE_COLUMN)
  const handleDelete = () => {
    deleteColumn(id)
    onClose()
  }

  if (!column || !isVisible) {
    return null
  }

  return (
    <Modal title="Delete Column" onClose={onClose}>
      <div>Are you sure you want to delete: {column.label} column?</div>
      <div>
        <button type="button" onClick={onClose}>
          No
        </button>
        <button type="submit" onClick={handleDelete}>
          Yes
        </button>
      </div>
    </Modal>
  )
}
