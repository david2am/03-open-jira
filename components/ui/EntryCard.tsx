import React, { FC, DragEvent, useContext } from 'react'

import { Card, CardActions, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry
}
export const EntryCard:FC<Props> = ({ entry: { description, _id } }) => {

    const { startDragging, endDragging } = useContext( UIContext )

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', _id)
        startDragging()
    }
    const onDragEnd = () => {
        endDragging()
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <Typography sx={{ whiteSpace: 'pre-line' }}>
                {description}
            </Typography>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                <Typography variant='body2'>
                    Hace 30min
                </Typography>
            </CardActions>
        </Card>
    )
}
