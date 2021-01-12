import React, { useState, useEffect } from 'react'

import './Board.css'
import { Page } from '../../../shared/components/page/Page'
import { useSelector } from '../../../../context/hooks/use-selector'
import { getAllColumns } from '../../selectors/column'
import { useAction } from '../../../../context/hooks/use-action'
import { StateAction } from '../../../../context/types/state'
import { DraftColumn } from '../../types/column'
import { Column as ColumnComponent } from '../column/Column'
import { ManageColumnModal } from '../column/ManageColumnModal'
import { DeleteColumnModal } from '../column/DeleteColumnModal'
import { DefaultColumn } from '../column/DefaultColumn'

export const Board = () => {
  const [isModalVisible, setModalVisibility] = useState<boolean>(false)
  const [deletingColumnId, setDeletingColumnId] = useState<number | null>(null)
  const [editingColumnId, setEditingColumnId] = useState<number | null>(null)
  const columns = useSelector(getAllColumns)
  const createColumn = useAction(StateAction.CREATE_COLUMN)
  const readAllColumns = useAction(StateAction.READ_ALL_COLUMNS)
  const readAllCards = useAction(StateAction.READ_ALL_CARDS)
  const deleteColumn = useAction(StateAction.DELETE_COLUMN)
  const editColumn = useAction(StateAction.EDIT_COLUMN)
  const handleCreateColumn = (data: DraftColumn) => {
    createColumn(data)
    setModalVisibility(false)
  }
  const handleEditColumn = (data: DraftColumn) => {
    editColumn(editingColumnId, data)
    setModalVisibility(false)
    setEditingColumnId(null)
  }
  const handleDeleteColumn = () => {
    deleteColumn(deletingColumnId)
    setDeletingColumnId(null)
  }
  const handleShowEditModal = (id: number) => {
    setEditingColumnId(id)
    setModalVisibility(true)
  }

  useEffect(() => {
    readAllColumns()
    readAllCards()
  }, [readAllColumns, readAllCards])

  return (
    <Page>
      <section>
        <h2>Your Board</h2>
      </section>
      <section className="board-columns">
        {columns.map((column) => (
          <ColumnComponent
            key={column.id}
            id={column.id}
            name={column.label}
            color={column.color}
            onDelete={() => setDeletingColumnId(column.id)}
            onEdit={() => handleShowEditModal(column.id)}
          />
        ))}
        <DefaultColumn onCreateColumn={() => setModalVisibility(true)} />
      </section>
      {isModalVisible && (
        <ManageColumnModal
          onClose={() => setModalVisibility(false)}
          onCreate={handleCreateColumn}
          onEdit={handleEditColumn}
          id={editingColumnId}
        />
      )}
      {Boolean(deletingColumnId) && (
        <DeleteColumnModal
          columnId={deletingColumnId}
          onClose={() => setDeletingColumnId(null)}
          onDelete={handleDeleteColumn}
        />
      )}
    </Page>
  )
}
