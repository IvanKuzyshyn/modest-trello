import { findIndex, propEq, adjust } from 'ramda'
import { Entity } from './api.types'

const getUniqueID = () => new Date().getTime()

const readFromStore = (name: Entity) => {
  const rawData = localStorage.getItem(name)

  try {
    // @ts-ignore
    const data = JSON.parse(rawData)

    if (!Array.isArray(data)) {
      return []
    }

    return data
  } catch (e) {
    console.error(e)
    return []
  }
}

const writeToStore = (name: Entity, data: any) => {
  localStorage.setItem(name, JSON.stringify(data))
}

export const create = <T>(name: Entity, data: T): T => {
  const existingItems = readFromStore(name)
  const newItem = { ...data, id: getUniqueID() }

  writeToStore(name, [...existingItems, newItem])
  return newItem
}

export const update = <T>(name: Entity, id: number, data: T): T => {
  const existingItems = readFromStore(name)
  const targetItemIndex = findIndex(propEq('id', id), existingItems)

  if (targetItemIndex === -1) {
    throw new Error('Not Found!')
  }

  const updatedItem = {
    ...existingItems[targetItemIndex],
    ...data,
    id,
  }

  writeToStore(
    name,
    adjust(targetItemIndex, () => updatedItem, existingItems)
  )

  return updatedItem
}

export const remove = <T>(name: Entity, id: number): T[] => {
  const existingItems = readFromStore(name)

  // @ts-ignore
  const updatedItems = existingItems.filter((item: T) => item.id !== id)

  writeToStore(name, updatedItems)
  return updatedItems
}

export const readAll = <T>(name: Entity): T[] => {
  return readFromStore(name)
}
