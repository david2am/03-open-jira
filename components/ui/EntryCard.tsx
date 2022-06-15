import React, { FC, DragEvent } from 'react'

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry
}
export const EntryCard:FC<Props> = ({ entry: { description, _id } }) => {
    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', _id)

        // TODO: update ui state
    }
    const onDragEnd = () => {
        // TODO: cancel onDrag
    }

    return (
        <div
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <Card
                    sx={{ marginBottom: 1 }}
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
        </div>
    )
}
