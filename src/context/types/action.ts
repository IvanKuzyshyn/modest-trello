import { StateAction } from './state'
import {Card, CardManagerSetup} from '../../scenes/board-page/types/card'
import {Column, ColumnManagerSetup} from '../../scenes/board-page/types/column'

export type ReadAllCardsAction = {
  type: StateAction.READ_ALL_CARDS
  payload: Card[]
}

export type ReadAllColumnsAction = {
  type: StateAction.READ_ALL_COLUMNS
  payload: Column[]
}

export type CreateCardAction = {
  type: StateAction.CREATE_CARD
  payload: Card
}

export type CreateColumnAction = {
  type: StateAction.CREATE_COLUMN
  payload: Column
}

export type EditCardAction = {
  type: StateAction.EDIT_CARD
  payload: Card
}

export type EditColumnAction = {
  type: StateAction.EDIT_COLUMN
  payload: Column
}

export type DeleteCardAction = {
  type: StateAction.DELETE_CARD
  payload: Card[]
}

export type DeleteColumnAction = {
  type: StateAction.DELETE_COLUMN
  payload: Column[]
}

export type SetColumnManagerAction = {
  type: StateAction.SET_COLUMN_MANAGER,
  payload: ColumnManagerSetup,
}

export type SetCardManagerAction = {
  type: StateAction.SET_CARD_MANAGER,
  payload: CardManagerSetup,
}

export type Action =
  | ReadAllCardsAction
  | ReadAllColumnsAction
  | CreateCardAction
  | CreateColumnAction
  | EditCardAction
  | EditColumnAction
  | DeleteCardAction
  | DeleteColumnAction
  | SetColumnManagerAction
  | SetCardManagerAction
