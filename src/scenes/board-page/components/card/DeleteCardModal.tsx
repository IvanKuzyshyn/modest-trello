import React from 'react'

import { Modal } from "../../../shared/components/modal/Modal";
import {Card} from "../../types/card";
import { useSelector } from "../../../../context/hooks/use-selector";
import { getCardById } from "../../selectors/card";

interface Props {
    cardId: number | null,
    onClose: () => void,
    onDelete: () => void,
}

export const DeleteCardModal = ({ cardId, onClose, onDelete }: Props) => {
    const card = useSelector<Card | undefined>((state) => getCardById(state, cardId))

    if (!card) {
        return null
    }

    return (
        <Modal title="Delete Card" onClose={onClose}>
            <div>Are you sure you want to delete: {card.name} card?</div>
            <div>
                <button type="button" onClick={onClose}>No</button>
                <button type="submit" onClick={onDelete}>Yes</button>
            </div>
        </Modal>
    )
}
