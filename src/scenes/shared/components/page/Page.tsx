import React from 'react'
import './Page.css'

interface Props {
  children: React.ReactNode
}

export const Page = ({ children }: Props) => (
  <>
    <header>
      <h1>Modest Trello</h1>
    </header>
    <section className="content">{children}</section>
  </>
)
