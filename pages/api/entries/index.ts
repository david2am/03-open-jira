import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Method = 'GET' | 'POST' | 'PUT' |  'DELETE'
type Request = {
    [Property in Method]?: ( res: NextApiResponse<Data> ) => Promise<void>
}

type Data = 
    | { message: string }
    | IEntry[]


const getEntries = async ( res: NextApiResponse<Data> ) => {
    await db.connect()
    const entries = await Entry.find().sort({ createdAt: 'asc' })
    await db.disconnect()
    
    res.status(200).json(entries)
}


const request: Request = {
    'GET': (res: NextApiResponse<Data>) => getEntries(res)
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method && request[req.method as Method])
        return request[req.method as Method]?.( res )
    return res.status(400).json({ message: 'Endpoint don\'t exist' })

    // switch ( req.method ) {
    //     case 'GET':
    //         return getEntries( res )
    
    //     default:
    //         return res.status(400).json({ message: 'Don\'t exist endpoint' })
    // }
}