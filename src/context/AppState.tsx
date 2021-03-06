import React, { useReducer, createContext } from 'react'
import { IAppState } from './types/state'
import { stateReducer } from './reducer/state'

interface Props {
  children: React.ReactNode
}

const noopState: IAppState = {
  cards: [],
  columns: [],
  columnManager: {
    id: null,
    isShown: false,
  },
  cardManager: {
    id: null,
    columnId: null,
    isShown: false,
  },
  dispatch: () => {},
}

export const AppContext = createContext<IAppState>(noopState)

export const AppState = ({ children }: Props) => {
  const [state, dispatch] = useReducer(stateReducer, noopState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
