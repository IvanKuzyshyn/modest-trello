export type Column = {
  id: number
  label: string
  color: string
}

export type DraftColumn = Omit<Column, 'id'>
