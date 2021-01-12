export type Card = {
  id: number
  name: string
  columnId: number
}

export type DraftCard = Omit<Card, 'id'>

export type CardManagerSetup = {
  id: number | null
  isShown: boolean
  columnId: number | null
}
