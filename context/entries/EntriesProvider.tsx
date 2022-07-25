import { FC, ReactNode, useEffect, useReducer } from 'react';

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

    const addNewEntry = async ( description: string ) => {
        try {
            const { data } = await entriesAPI.post<Entry>('entries', { description })
            
            dispatch({
                type: '[Entry] - Add-Entry',
                payload: data
            })
        } catch (error) {
            console.error((error as Error).message)
        }
    }
    
    const updateEntry = async ({ description, status, _id }: Entry) => {
        try {
            const { data } = await entriesAPI.put<Entry>(
                `entries/${ _id }`,
                { description, status }
            )
            
            dispatch({ type: '[Entry] - Update-Entry', payload: data })
        } catch (error) {
            console.error((error as Error).message)
        }
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
