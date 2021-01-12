import { useContext } from 'react'
import { dissoc } from 'ramda'
import { AppContext } from '../AppState'

import { StateAccessor } from '../types/state'

export const useSelector = (accessor: StateAccessor) => {
  const context = useContext(AppContext)

  return accessor(dissoc('dispatch', context))
}
