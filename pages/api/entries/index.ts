import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Method = 'GET' | 'POST' | 'PUT' |  'DELETE'
type Request = {
    [Property in Method]?: (( req: NextApiRequest, res: NextApiResponse<Data> ) => Promise<void>)
}

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry


const getEntries = async ( res: NextApiResponse<Data> ) => {
    try {
        await db.connect()
        const entries = await Entry.find().sort({ createdAt: 'asc' })
        await db.disconnect()
        
        res.status(200).json(entries)
    } catch (error) {
        await db.disconnect()
        res.status(500).json({ message: 'Something went wrong' })
    }
}

const addEntry = async (req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { body: { description = '' } } = req

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    })

    try {
        await db.connect()
        await newEntry.save()
        await db.disconnect()
        
        res.status(201).json( newEntry )
    } catch (error) {
        await db.disconnect()
        res.status(500).json({ message: 'Something went wrong' })
    }
}


const request: Request = {
    'GET':  ( req, res ) => getEntries(res),
    'POST': ( req, res ) => addEntry(req, res),
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method && request[req.method as Method]) {
        return request[req.method as Method]?.( req, res )
    }
    return res.status(400).json({ message: 'Endpoint don\'t exist' })

    // switch ( req.method ) {
    //     case 'GET':
    //         return getEntries( res )
    
    //     default:
    //         return res.status(400).json({ message: 'Don\'t exist endpoint' })
    // }
}