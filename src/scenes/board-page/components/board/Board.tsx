import React, {useEffect, useState} from 'react'

import './Board.css'
import {Page} from '../../../shared/components/page/Page'
import {useSelector} from '../../../../context/hooks/use-selector'
import {getAllColumns} from '../../selectors/column'
import {useAction} from '../../../../context/hooks/use-action'
import {StateAction} from '../../../../context/types/state'
import {Column as ColumnComponent} from '../column/Column'
import {DeleteColumnModal} from '../column/DeleteColumnModal'
import {DefaultColumn} from '../column/DefaultColumn'

export const Board = () => {
  const [deletingColumnId, setDeletingColumnId] = useState<number | null>(null)
  const columns = useSelector(getAllColumns)
  const readAllColumns = useAction(StateAction.READ_ALL_COLUMNS)
  const readAllCards = useAction(StateAction.READ_ALL_CARDS)
  const deleteColumn = useAction(StateAction.DELETE_COLUMN)
  const setColumnManager = useAction(StateAction.SET_COLUMN_MANAGER)
  const handleDeleteColumn = () => {
    deleteColumn(deletingColumnId)
    setDeletingColumnId(null)
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
            onEdit={() => setColumnManager({ isShown: true, id: column.id })}
          />
        ))}
        <DefaultColumn onCreateColumn={() => setColumnManager({ id: null, isShown: true })} />
      </section>
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
