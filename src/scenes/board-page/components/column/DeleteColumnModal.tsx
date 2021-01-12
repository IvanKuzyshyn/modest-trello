import React from 'react'

import { useSelector } from "../../../../context/hooks/use-selector";
import { getColumnById } from "../../selectors/column";
import { Modal } from "../../../shared/components/modal/Modal";
import {Column} from "../../types/column";

interface Props {
    columnId: number | null,
    onClose: () => void,
    onDelete: () => void,
}

export const DeleteColumnModal = ({ columnId, onClose, onDelete }: Props) => {
    const column = useSelector<Column | undefined>((state) => getColumnById(state, columnId))

    if (!column) {
        return null
    }

    return (
        <Modal title="Delete Column" onClose={onClose}>
            <div>Are you sure you want to delete: {column.label} column?</div>
            <div>
                <button type="button" onClick={onClose}>
                    No
                </button>
                <button type="submit" onClick={onDelete}>
                    Yes
                </button>
            </div>
        </Modal>
    )
}
