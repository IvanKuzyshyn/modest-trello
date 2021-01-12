import React, { useMemo } from 'react'

import { useSelector } from "../../../../context/hooks/use-selector";
import { getAllColumns } from "../../selectors/column";
import {Column} from "../../types/column";

interface Props {
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const ColumnSelector = ({ value, onChange, ...props }: Props) => {
    const columns = useSelector<Column[]>(getAllColumns)
    const options = useMemo(
        () => columns.map((column) => ({ id: column.id, label: column.label })),
        [columns]
    )

    return (
        <select {...props} onChange={onChange} value={value}>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
