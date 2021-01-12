export type Card = {
  id: number
  name: string
  columnId: number
}

export type DraftCard = Omit<Card, 'id'>
