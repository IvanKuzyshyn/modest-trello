import React from 'react'

interface Props {
    onCreate: () => void,
}

export const CreateCardButton = ({ onCreate }: Props) => (
    <div className="card card-button" role="button" onClick={onCreate}>
        Create Card
    </div>
)
