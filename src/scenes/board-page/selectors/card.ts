import {StateAccessor} from "../../../context/types/state";
import { Card } from "../types/card";

export const getCardsByColumnId: StateAccessor<Card[]> = (state, columnId: number) =>
    state.cards.filter((card) => card.columnId === columnId)
export const getCardById: StateAccessor<Card | undefined> = (state, id: number) =>
    state.cards.find((card) => card.id === id)
