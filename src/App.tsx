import React from 'react'
import { Board } from './scenes/board-page/components/board/Board'
import { AppState } from './context/AppState'
import { ManageColumnModal } from './scenes/board-page/components/column/ManageColumnModal'
import { ManageCardModal } from './scenes/board-page/components/card/ManageCardModal'

const App = () => (
  <AppState>
    <Board />
    <ManageColumnModal />
    <ManageCardModal />
  </AppState>
)

export default App
