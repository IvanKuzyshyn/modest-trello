import { StateAccessor } from '../../../context/types/state'
import { Column } from '../types/column'
import {number} from "prop-types";

export const getAllColumns: StateAccessor<Column[]> = (state) => state.columns
export const getColumnById: StateAccessor<Column | undefined> = (
  state,
  id?: number
) => {
    if (!number) {
        return undefined
    }

    return state.columns.find((column) => column.id === id)
}
export const isColumnManagerShown: StateAccessor<boolean> = (state) =>
  state.columnManager.isShown
export const getManagingColumnId: StateAccessor<number | null> = (state) =>
  state.columnManager.id
