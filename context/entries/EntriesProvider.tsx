import { FC, ReactNode, useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid'
import { EntriesContext, entriesReducer } from './';

import { Entry } from '../../interfaces';
import entriesAPI from '../../apis/entriesAPI';

export interface EntriesState {
    entries: Entry[];
}
interface Props {
    children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = ( description: string ) => {
        const newEntry: Entry = {
            description,
            _id: uuidv4(),
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({
            type: '[Entry] - Add-Entry',
            payload: newEntry
        })
    }

    const updateEntry = (entry: Entry) => {

        dispatch({ type: '[Entry] - Update-Entry', payload: entry })
    }

    const refreshEntries = async () => {
      const { data } = await entriesAPI.get<Entry[]>('entries')
      dispatch({ type: '[Entry] - Refresh-Entries', payload: data })
    }

    useEffect(() => {
        try {
            refreshEntries()
        } catch (error) {
            console.log((error as Error).message)
        }
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}
