import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { Card } from '../Card'

const getProps = (props = {}) => ({
  name: 'Test name',
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  ...props,
})

describe('Card', function () {
  test('displays name and shot more button', () => {
    const props = getProps()
    render(<Card {...props} />)

    expect(screen.queryByText(props.name)).toBeInTheDocument()
    expect(screen.queryByText('More')).toBeInTheDocument()
  })

  test('shows and hides controls when clicking on more', () => {
    const props = getProps()
    render(<Card {...props} />)

    fireEvent.click(screen.getByText('More'))
    expect(screen.queryByTestId('card-edit')).toBeInTheDocument()
    expect(screen.queryByTestId('card-delete')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Less'))
    expect(screen.queryByTestId('card-edit')).not.toBeInTheDocument()
    expect(screen.queryByTestId('card-delete')).not.toBeInTheDocument()
  })

  test('call onDelete callback', () => {
    const props = getProps()
    render(<Card {...props} />)

    fireEvent.click(screen.getByText('More'))
    fireEvent.click(screen.getByTestId('card-edit'))
    expect(props.onEdit).toHaveBeenCalled()
    expect(props.onEdit).toHaveBeenCalledTimes(1)
  })

  test('call onEdit callback', () => {
    const props = getProps()
    render(<Card {...props} />)

    fireEvent.click(screen.getByText('More'))
    fireEvent.click(screen.getByTestId('card-delete'))
    expect(props.onDelete).toHaveBeenCalled()
    expect(props.onDelete).toHaveBeenCalledTimes(1)
  })
})
