import { append, update, findIndex, propEq } from 'ramda'
import { IReducerState } from '../types/state'
import { Action } from '../types/action'
import { StateAction } from '../types/state'

export const stateReducer = (state: IReducerState, action: Action) => {
  switch (action.type) {
    case StateAction.READ_ALL_COLUMNS:
    case StateAction.DELETE_COLUMN:
      return {
        ...state,
        columns: action.payload,
      }
    case StateAction.CREATE_COLUMN:
      return {
        ...state,
        columns: append(action.payload, state.columns),
      }
    case StateAction.EDIT_COLUMN:
      return {
        ...state,
        columns: update(
          findIndex(propEq('id', action.payload.id), state.columns),
          action.payload,
          state.columns
        ),
      }
    case StateAction.READ_ALL_CARDS:
    case StateAction.DELETE_CARD:
      return {
        ...state,
        cards: action.payload,
      }
    case StateAction.CREATE_CARD: {
      return {
        ...state,
        cards: append(action.payload, state.cards),
      }
    }
    case StateAction.EDIT_CARD:
      return {
        ...state,
        cards: update(
          findIndex(propEq('id', action.payload.id), state.cards),
          action.payload,
          state.cards
        ),
      }
    default:
      return state
  }
}
