import { StateAccessor } from '../../../context/types/state'
import { Card } from '../types/card'

export const getCardsByColumnId: StateAccessor<Card[]> = (
  state,
  columnId: number
) => state.cards.filter((card) => card.columnId === columnId)
export const getCardById: StateAccessor<Card | undefined> = (
  state,
  id?: number
) => {
    if (!id) {
        return undefined
    }

    return state.cards.find((card) => card.id === id)
}
export const isCardManagerShown: StateAccessor<boolean> = (state) =>
    state.cardManager.isShown
export const getManagingCardId: StateAccessor<number | null> = (state) =>
    state.cardManager.id
export const getManagingCardColumnId: StateAccessor<number | null> = (state) =>
    state.cardManager.columnId
