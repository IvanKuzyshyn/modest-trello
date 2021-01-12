import React from 'react'
import './Page.css'

interface Proos {
  children: React.ReactNode
}

export const Page = ({ children }: Proos) => (
  <>
    <header>
      <h1>Modest Trello</h1>
    </header>
    <section className="content">{children}</section>
  </>
)
