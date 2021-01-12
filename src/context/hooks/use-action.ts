import { Dispatch, useContext, useMemo } from 'react'

import { AppContext } from '../AppState'
import { StateAction } from '../types/state'
import { create, readAll, remove, update } from '../../services/api/api'
import { Entity } from '../../services/api/api.types'
import { Column, DraftColumn } from '../../scenes/board-page/types/column'
import {
  CreateCardAction,
  CreateColumnAction,
  DeleteCardAction,
  DeleteColumnAction,
  EditCardAction,
  EditColumnAction,
  ReadAllCardsAction,
  ReadAllColumnsAction,
} from '../types/action'
import { Card, DraftCard } from '../../scenes/board-page/types/card'

const HANDLERS: Record<StateAction, Function> = {
  [StateAction.READ_ALL_COLUMNS]: (
    dispatch: Dispatch<ReadAllColumnsAction>
  ) => () => {
    const items = readAll<Column>(Entity.COLUMN)

    dispatch({
      type: StateAction.READ_ALL_COLUMNS,
      payload: items,
    })
  },
  [StateAction.READ_ALL_CARDS]: (
    dispatch: Dispatch<ReadAllCardsAction>
  ) => () => {
    const items = readAll<Card>(Entity.COLUMN)

    dispatch({
      type: StateAction.READ_ALL_CARDS,
      payload: items,
    })
  },
  [StateAction.CREATE_COLUMN]: (dispatch: Dispatch<CreateColumnAction>) => (
    data: DraftColumn
  ) => {
    const item = create<Column>(Entity.COLUMN, data as Column)

    dispatch({
      type: StateAction.CREATE_COLUMN,
      payload: item,
    })
  },
  [StateAction.CREATE_CARD]: (dispatch: Dispatch<CreateCardAction>) => (
    data: DraftCard
  ) => {
    const item = create<Card>(Entity.COLUMN, data as Card)

    dispatch({
      type: StateAction.CREATE_CARD,
      payload: item,
    })
  },
  [StateAction.EDIT_COLUMN]: (dispatch: Dispatch<EditColumnAction>) => (
    id: number,
    data: DraftColumn
  ) => {
    const item = update<Column>(Entity.COLUMN, id, data as Column)

    dispatch({
      type: StateAction.EDIT_COLUMN,
      payload: item,
    })
  },
  [StateAction.EDIT_CARD]: (dispatch: Dispatch<EditCardAction>) => (
    id: number,
    data: DraftCard
  ) => {
    const item = update<Card>(Entity.COLUMN, id, data as Card)

    dispatch({
      type: StateAction.EDIT_CARD,
      payload: item,
    })
  },
  [StateAction.DELETE_COLUMN]: (dispatch: Dispatch<DeleteColumnAction>) => (
    id: number
  ) => {
    const items = remove<Column>(Entity.COLUMN, id)

    dispatch({
      type: StateAction.DELETE_COLUMN,
      payload: items,
    })
  },
  [StateAction.DELETE_CARD]: (dispatch: Dispatch<DeleteCardAction>) => (
    id: number
  ) => {
    const items = remove<Card>(Entity.CARD, id)

    dispatch({
      type: StateAction.DELETE_CARD,
      payload: items,
    })
  },
}

export const useAction = (action: StateAction) => {
  const { dispatch } = useContext(AppContext)
  const handler = HANDLERS[action]

  if (!handler) {
    throw new Error('Action handler no found. Check name spelling')
  }

  return useMemo(() => handler(dispatch), [handler])
}