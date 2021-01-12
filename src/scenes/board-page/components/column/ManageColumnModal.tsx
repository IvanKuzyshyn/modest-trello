import React, {useEffect, useState} from 'react'
import {useSelector} from '../../../../context/hooks/use-selector'
import {useAction} from '../../../../context/hooks/use-action'
import {getColumnById, getManagingColumnId, isColumnManagerShown,} from '../../selectors/column'
import {StateAction} from "../../../../context/types/state";
import {DraftColumn} from "../../types/column";
import {Modal} from "../../../shared/components/modal/Modal";

const DEFAULT_LABEL = ''
const DEFAULT_COLOR = '#000000'

export const ManageColumnModal = () => {
  const isShown = useSelector(isColumnManagerShown)
  const columnId = useSelector(getManagingColumnId)
    const [label, setLabel] = useState<string>(DEFAULT_LABEL)
    const [color, setColor] = useState<string>(DEFAULT_COLOR)
    const column = useSelector(state => getColumnById(state, columnId))
    const createColumn = useAction(StateAction.CREATE_COLUMN)
    const editColumn = useAction(StateAction.EDIT_COLUMN)
    const setColumnManager = useAction(StateAction.SET_COLUMN_MANAGER)

    useEffect(() => {
        if (!column) {
            return
        }

        setLabel(column.label)
        setColor(column.color)
    }, [column])

    if (!isShown) {
        return null
    }

    const isNew = !column
    const handleClose = () => {
        setColumnManager({ id: null, isShown: false })
        setLabel(DEFAULT_LABEL)
        setColor(DEFAULT_COLOR)
    }
    const handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) =>
        setLabel(event.target.value)
    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) =>
        setColor(event.target.value)
    const disabledSubmit = label.trim().length === 0
    const title = isNew ? 'Create New Column' : 'Edit Column'
    const submitButtonText = isNew ? 'Create' : 'Update'
    const handleSubmit = () => {
        if (disabledSubmit) {
            return
        }

        const data: DraftColumn = { label, color }
        column ? editColumn(column.id, data) : createColumn(data)
        handleClose()
    }

    return (
        <Modal title={title} onClose={handleClose}>
            <div>
                <input
                    type="text"
                    value={label}
                    name="column-label"
                    onChange={handleChangeLabel}
                />
                <input
                    type="color"
                    value={color}
                    name="column-color"
                    onChange={handleChangeColor}
                />
            </div>
            <div>
                <button type="button" onClick={handleClose}>
                    Cancel
                </button>
                <button type="submit" onClick={handleSubmit} disabled={disabledSubmit}>
                    {submitButtonText}
                </button>
            </div>
        </Modal>
    )
}
