import React, {useState} from 'react'

import './Column.css'
import {Card as CardComponent} from "../card/Card";
import {useSelector} from "../../../../context/hooks/use-selector";
import {getCardsByColumnId} from "../../selectors/card";
import {Card, DraftCard} from "../../types/card";
import {useAction} from "../../../../context/hooks/use-action";
import {StateAction} from "../../../../context/types/state";


interface Props {
    id: number,
    name: string,
    color: string,
    onDelete: () => void,
    onEdit: () => void,
}

export const Column = ({ id, name, color, onDelete, onEdit }: Props) => {
    const [isModalVisible, setModalVisibility] = useState<boolean>(false)
    const [deletingCardId, setDeletingCardId] = useState<number | null>(null)
    const [editingCardId, setEditingCardId] = useState<number | null>(null)
    const cards = useSelector<Card[]>(state => getCardsByColumnId(state, id))
    const createCard = useAction(StateAction.CREATE_CARD)
    const deleteCard = useAction(StateAction.DELETE_CARD)
    const editCard = useAction(StateAction.EDIT_CARD)

    const handleCreateCard = (data: DraftCard) => {
        console.log('data', data)
        setModalVisibility(false)
        createCard(data)
    }
    const handleEditCard = (data: DraftCard) => {
        console.log('data', data)
        editCard(editingCardId, data)
        setEditingCardId(null)
        setModalVisibility(false)
    }
    const handleDeleteCard = () => {
        deleteCard(deletingCardId)
        setDeletingCardId(null)
    }
    const handleShowEditModal = (id: number) => {
        setEditingCardId(id)
        setModalVisibility(true)
    }

    return (
        <div className="column" style={{ borderTopColor: color }}>
            <div className="title">
                <h4>{name}</h4>
                <div>
                    <button onClick={onEdit}>&#9998;</button>
                    <button onClick={onDelete}>&#10006;</button>
                </div>
            </div>
            {cards.map((card) => (
                <CardComponent
                    key={card.id}
                    name={card.name}
                    onDelete={() => setDeletingCardId(card.id)}
                    onEdit={() => handleShowEditModal(card.id)}
                />
            ))}
        </div>
    )
}
