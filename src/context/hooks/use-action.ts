import { Dispatch, useContext, useMemo } from 'react'

import { AppContext } from '../AppState'
import { StateAction } from '../types/state'
import { create, readAll, remove, update } from '../../services/api/api'
import { Entity } from '../../services/api/api.types'
import {Column, ColumnManagerSetup, DraftColumn} from '../../scenes/board-page/types/column'
import {
  CreateCardAction,
  CreateColumnAction,
  DeleteCardAction,
  DeleteColumnAction,
  EditCardAction,
  EditColumnAction,
  ReadAllCardsAction,
  ReadAllColumnsAction, SetCardManagerAction, SetColumnManagerAction,
} from '../types/action'
import {Card, CardManagerSetup, DraftCard} from '../../scenes/board-page/types/card'

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
    const items = readAll<Card>(Entity.CARD)

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
    const item = create<Card>(Entity.CARD, data as Card)

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
    const item = update<Card>(Entity.CARD, id, data as Card)

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
  [StateAction.SET_COLUMN_MANAGER]: (dispatch: Dispatch<SetColumnManagerAction>) => (data: ColumnManagerSetup) => {
    dispatch({
      type: StateAction.SET_COLUMN_MANAGER,
      payload: data,
    })
  },
  [StateAction.SET_CARD_MANAGER]: (dispatch: Dispatch<SetCardManagerAction>) => (data: CardManagerSetup) => {
    dispatch({
      type: StateAction.SET_CARD_MANAGER,
      payload: data,
    })
  }
}

export const useAction = (action: StateAction) => {
  const { dispatch } = useContext(AppContext)
  const handler = HANDLERS[action]

  if (!handler) {
    throw new Error('Action handler no found. Check name spelling')
  }

  // Because of React guarantees that dispatch function identity is stable
  // look at https://reactjs.org/docs/hooks-reference.html#usereducer
  // eslint-disable-next-line
  return useMemo(() => handler(dispatch), [handler])
}
