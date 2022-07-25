import { NextApiRequest, NextApiResponse } from "next/types"
import { db } from "../database"
import { Error } from '../interfaces'

export const tryCatchCallBack = ( req: NextApiRequest, res: NextApiResponse<any>, id = '' ) => {
    return async (
        handler: ( req: NextApiRequest, res: NextApiResponse<any>, id?: string ) => Promise<void>,
        error: Error
    ) => {
        const { status, message } = error
    
        try {
            await db.connect()
            if ( id ) {
                await handler( req, res, id )
            } else {
                await handler( req, res )
            }
            await db.disconnect()
        } catch (error) {
            await db.disconnect()
            res.status(status).json({ message })
        }
    }
}