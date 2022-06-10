import React from 'react'

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

export const EntryCard = () => {
  return (
    <Card sx={{ marginBottom: 1 }}>
        <CardActionArea>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
                Esta es la descripcion
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
