import React, {useState} from 'react'

import './Column.css'
import {Card as CardComponent} from '../card/Card'
import {useSelector} from '../../../../context/hooks/use-selector'
import {getCardsByColumnId} from '../../selectors/card'
import {useAction} from '../../../../context/hooks/use-action'
import {StateAction} from '../../../../context/types/state'
import {CreateCardButton} from '../card/CreateCardButton'
import { DeleteConfirmation } from "./DeleteConfirmation";

interface Props {
  id: number
  name: string
  color: string
}

export const Column = ({ id, name, color }: Props) => {
  const [isShownConfirmation, showConfirmation] = useState<boolean>(false)
  const cards = useSelector((state) => getCardsByColumnId(state, id))
  const setCardManager = useAction(StateAction.SET_CARD_MANAGER)
  const setColumnManager = useAction(StateAction.SET_COLUMN_MANAGER)

  return (
    <div className="column" style={{ borderTopColor: color }}>
      <div className="title">
        <h4>{name}</h4>
        <div>
          <button onClick={() => setColumnManager({ isShown: true, id})}>&#9998;</button>
          <button onClick={() => showConfirmation(true)}>&#10006;</button>
        </div>
      </div>
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          id={card.id}
          name={card.name}
          onEdit={() => setCardManager({ id: card.id, columnId: id, isShown: true })}
        />
      ))}
      <CreateCardButton onCreate={() => setCardManager({ id: null, columnId: id, isShown: true })} />
      <DeleteConfirmation
          id={id}
          onClose={() => showConfirmation(false)}
          isVisible={isShownConfirmation}
      />
    </div>
  )
}
