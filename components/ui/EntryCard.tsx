import React, { FC } from 'react'

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry
}
export const EntryCard:FC<Props> = ({ entry: { description } }) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
        <CardActionArea>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
                {description}
            </Typography>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                <Typography variant='body2'>
                    Hace 30min
                </Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
