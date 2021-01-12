import React from 'react'

import {Modal} from '../../../shared/components/modal/Modal'
import {useSelector} from '../../../../context/hooks/use-selector'
import {getCardById} from '../../selectors/card'
import {useAction} from "../../../../context/hooks/use-action";
import {StateAction} from "../../../../context/types/state";

interface Props {
    id: number,
    isVisible: boolean,
    onClose: () => void
}

export const DeleteConfirmation = ({ id, onClose, isVisible }: Props) => {
    const card = useSelector((state) => getCardById(state, id))
    const deleteCard = useAction(StateAction.DELETE_CARD)
    const handleDelete = () => {
        deleteCard(id)
        onClose()
    }

    if (!card || !isVisible) {
        return null
    }

    return (
        <Modal title="Delete Card" onClose={onClose}>
            <div>Are you sure you want to delete: {card.name} card?</div>
            <div>
                <button type="button" onClick={onClose}>No</button>
                <button type="submit" onClick={handleDelete}>Yes</button>
            </div>
        </Modal>
    )
}
