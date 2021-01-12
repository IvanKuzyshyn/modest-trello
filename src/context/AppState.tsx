import React, { useReducer, createContext } from 'react'
import {IAppState} from "./types/state";
import {stateReducer} from './reducer/state'

interface Props {
    children: React.Component
}

const noopState: IAppState = {
    cards: [],
    columns: [],
    dispatch: () => {},
}

export const AppContext = createContext<IAppState>(noopState)

const AppState = ({ children }: Props) => {
    const [state, dispatch] = useReducer(stateReducer, noopState)

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppState