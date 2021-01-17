import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AppContext } from "../../../../../context/AppState";

import { Card } from '../Card'

const getProps = (props = {}) => ({
  name: 'Test name',
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  id: 1,
  ...props,
})

const renderWithContext = () => {
  const dispatch = jest.fn()
  const props = getProps()
  const context = {
    cards: [
      {
        id: props.id,
        name: props.name,
        columnId: 1,
      }
    ],
    columns: [],
    columnManager: {
      id: null,
      isShown: false,
    },
    cardManager: {
      id: null,
      columnId: null,
      isShown: false,
    },
    dispatch,
  }

  render(<AppContext.Provider value={context}><Card {...props} /></AppContext.Provider>)
  return { props, context }
}

describe('Card', function () {
  let modalRoot: HTMLDivElement;
  beforeEach(() => {
    modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'portals-root')
    document.body.appendChild(modalRoot)
  })

  afterEach(() => {
    document.body.removeChild(modalRoot)
  })

  test('displays name and shot more button', () => {
    const { props } = renderWithContext()

    expect(screen.queryByText(props.name)).toBeInTheDocument()
    expect(screen.queryByText('More')).toBeInTheDocument()
  })

  test('shows and hides controls when clicking on more', () => {
    const { props } = renderWithContext()

    fireEvent.click(screen.getByText('More'))
    expect(screen.queryByTestId('card-edit')).toBeInTheDocument()
    expect(screen.queryByTestId('card-delete')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Less'))
    expect(screen.queryByTestId('card-edit')).not.toBeInTheDocument()
    expect(screen.queryByTestId('card-delete')).not.toBeInTheDocument()
  })

  test('call onEdit callback', () => {
    const { props } = renderWithContext()

    fireEvent.click(screen.getByText('More'))
    fireEvent.click(screen.getByTestId('card-edit'))
    expect(props.onEdit).toHaveBeenCalled()
    expect(props.onEdit).toHaveBeenCalledTimes(1)
  })

  test('call onDelete handler and shows confirmation', () => {
    const { props } = renderWithContext()

    fireEvent.click(screen.getByText('More'))
    fireEvent.click(screen.getByTestId('card-delete'))
    expect(screen.getByText(`Are you sure you want to delete: ${props.name} card?`)).toBeInTheDocument()
  })
})
