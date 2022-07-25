import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'
import { Request } from '../../../interfaces'
import { restEndpoint } from '../../../mid/rest'

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

// ---
const getEntries = async ( res: NextApiResponse<Data> ) => {
    const entries = await Entry.find().sort({ createdAt: 'asc' })

    res.status(200).json(entries)
}

const addEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { body: { description = '' } } = req

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    })

    await newEntry.save()
    
    res.status(201).json( newEntry )
}

const request: Request = {
    'GET':  ( req, res ) => getEntries( res ),
    'POST': ( req, res ) => addEntry( req, res ) 
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    restEndpoint(request)( req, res )
}