import React from 'react'

import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard';

export const EntryList = () => {
  return (
    <div>
        <Paper sx={{
            height: 'calc( 100vh - 180px )',
            overflowY: 'scroll',
            backgroundColor: 'transparent',
            padding: '3px 5px',
            '&::-webkit-scrollbar': { display: 'none' }
        }}>
            {/* opacidad cambiará dependiendo de si estoy haciendo drag o no */}
            <List sx={{ opacity: 1 }}>
                <EntryCard />
                <EntryCard />
                <EntryCard />
            </List>
        </Paper>
    </div>
  )
}
