import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database'
import { Request } from '../../../interfaces'
import { Entry, IEntry } from '../../../models';
import { restEndpoint } from '../../../mid/rest';

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data>, id: string ) => {
    const entryToUpdate = await Entry.findById( id )

    if (!entryToUpdate) {
        return res.status( 400 ).json( { message: 'No hay entrada con id' } )
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body

    const updateEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true })

    res.status( 200 ).json( updateEntry! )
}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data>, id: string ) => {
    const entry = await Entry.findById( id )

    if (!entry) return res.status( 400 ).json( { message: 'No hay entrada con id' } )

    res.status( 200 ).json( entry )
}

const request: Request = {
    'PUT':  ( req, res, id ) => updateEntry( req, res, id! ),
    'GET': ( req, res, id ) => getEntry( req, res, id! )
}

export default function handler ( req: NextApiRequest, res: NextApiResponse<Data> ) {
    const { id } = req.query

    if (!mongoose.isValidObjectId( id )) {
        return res.status( 400 ).json( { message: 'Not valid ID' } )
    }

    restEndpoint(request)( req, res, id as string )
}

