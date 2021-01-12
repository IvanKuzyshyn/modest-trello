import React from 'react'
import { Board } from './scenes/board-page/components/board/Board'
import { AppState } from './context/AppState'
import { ManageColumnModal } from "./scenes/board-page/components/column/ManageColumnModal";

const App = () => (
  <AppState>
    <Board />
    <ManageColumnModal />
  </AppState>
)

export default App
