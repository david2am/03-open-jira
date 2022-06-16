import React, { FC, useContext, useMemo, DragEvent } from 'react'

import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext( EntriesContext )
  const { isDragging } = useContext( UIContext )

  const entriesByStatus = useMemo( () => entries.filter((e) => e.status === status), [entries, status])

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
  }
  const allowDrop = (event: DragEvent<HTMLDivElement>) => event.preventDefault()

  return (
    <div
      onDrop={ onDrop }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{
            height: 'calc( 100vh - 180px )',
            overflowY: 'scroll',
            backgroundColor: 'transparent',
            padding: '3px 5px',
            '&::-webkit-scrollbar': { display: 'none' }
        }}>
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
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
