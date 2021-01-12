import React, { useEffect } from 'react'

import './Board.css'
import { Page } from '../../../shared/components/page/Page'
import { useSelector } from '../../../../context/hooks/use-selector'
import { getAllColumns } from '../../selectors/column'
import { useAction } from '../../../../context/hooks/use-action'
import { StateAction } from '../../../../context/types/state'
import { Column as ColumnComponent } from '../column/Column'
import { DefaultColumn } from '../column/DefaultColumn'

export const Board = () => {
  const columns = useSelector(getAllColumns)
  const readAllColumns = useAction(StateAction.READ_ALL_COLUMNS)
  const readAllCards = useAction(StateAction.READ_ALL_CARDS)
  const setColumnManager = useAction(StateAction.SET_COLUMN_MANAGER)

  useEffect(() => {
    readAllColumns()
    readAllCards()
  }, [readAllColumns, readAllCards])

  return (
    <Page>
      <section className="board-header">
        <h2>Your Board</h2>
      </section>
      <section className="board-columns">
        {columns.map((column) => (
          <ColumnComponent
            key={column.id}
            id={column.id}
            name={column.label}
            color={column.color}
          />
        ))}
        <DefaultColumn
          onCreateColumn={() => setColumnManager({ id: null, isShown: true })}
        />
      </section>
    </Page>
  )
}
