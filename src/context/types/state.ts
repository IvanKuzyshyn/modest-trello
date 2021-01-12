import { Dispatch } from 'react'

import { Card } from '../../scenes/board-page/types/card'
import { Column } from '../../scenes/board-page/types/column'

export enum StateAction {
  CREATE_COLUMN,
  DELETE_COLUMN,
  EDIT_COLUMN,
  READ_ALL_COLUMNS,
  CREATE_CARD,
  DELETE_CARD,
  EDIT_CARD,
  READ_ALL_CARDS,
  SET_COLUMN_MANAGER,
}

export interface IReducerState {
  cards: Card[]
  columns: Column[]
  columnManager: {
    id: number | null
    isShown: boolean
  }
}

export interface IAppState extends IReducerState {
  dispatch: Dispatch<any>
}

export type StateAccessor<T> = (state: IReducerState, ...args: any[]) => T
