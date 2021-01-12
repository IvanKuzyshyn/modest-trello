import React, { useReducer, createContext } from 'react'
import { IAppState } from './types/state'
import { stateReducer } from './reducer/state'

interface Props {
  children: React.ReactNode
}

const noopState: IAppState = {
  cards: [],
  columns: [],
  dispatch: () => {},
}

export const AppContext = createContext<IAppState>(noopState)

export const AppState = ({ children }: Props) => {
  const [state, dispatch] = useReducer(stateReducer, noopState)

  console.log('sTATE', state)
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
