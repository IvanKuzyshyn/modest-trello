import {append, findIndex, propEq, update} from 'ramda'
import {IReducerState, StateAction} from '../types/state'
import {Action} from '../types/action'

export const stateReducer = (state: IReducerState, action: Action) => {
  console.log('ACTION', action)
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
    case StateAction.SET_COLUMN_MANAGER:
      return {
        ...state,
        columnManager: action.payload,
      }
    case StateAction.SET_CARD_MANAGER:
      return {
        ...state,
        cardManager: action.payload,
      }
    default:
      return state
  }
}
