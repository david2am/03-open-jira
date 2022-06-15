import React, { FC, useContext, useMemo, DragEvent } from 'react'

import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries/EntriesContext';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext( EntriesContext )

  const entriesByStatus = useMemo( () => entries.filter((e) => e.status === status), [entries, status])

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
  }
  const allowDrop = (event: DragEvent<HTMLDivElement>) => event.preventDefault()

  return (
    <div
      onDrop={ onDrop }
      onDragOver={ allowDrop }
    >
        <Paper sx={{
            height: 'calc( 100vh - 180px )',
            overflowY: 'scroll',
            backgroundColor: 'transparent',
            padding: '3px 5px',
            '&::-webkit-scrollbar': { display: 'none' }
        }}>
            {/* opacidad cambiará dependiendo de si estoy haciendo drag o no */}
            <List sx={{ opacity: 1 }}>
                {
                  entriesByStatus.map((entry) => (
                    <EntryCard key={entry._id} entry={entry} />
                  ))
                }
            </List>
        </Paper>
    </div>
  )
}
