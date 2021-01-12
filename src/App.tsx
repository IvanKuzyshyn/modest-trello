import React from 'react'
import { Board } from './scenes/board-page/components/board/Board'
import { AppState } from './context/AppState'

const App = () => (
  <AppState>
    <Board />
  </AppState>
)

export default App
