import { StateAccessor } from '../../../context/types/state'
import { Column } from '../types/column'

export const getAllColumns: StateAccessor<Column[]> = (state) => state.columns
export const getColumnById: StateAccessor<Column | undefined> = (
  state,
  id: number
) => state.columns.find((column) => column.id === id)
