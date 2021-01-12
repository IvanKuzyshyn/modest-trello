export type Column = {
  id: number
  label: string
  color: string
}

export type DraftColumn = Omit<Column, 'id'>

export type ColumnManagerSetup = {
  id: number | null,
  isShown: boolean
}
