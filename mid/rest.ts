import { NextApiRequest, NextApiResponse } from "next/types"
import { Method, Error, Request } from "../interfaces"
import { tryCatchCallBack } from "./trycatch"

export function restEndpoint (request: Request) {
    return function ( req: NextApiRequest, res: NextApiResponse<any>, id = '' ) {
        const error: Error = {
            status: 500,
            message: 'Something went wrong!'
        }
    
        const midTryCatch = tryCatchCallBack( req, res, id )
    
        const { method } = req
        
        if (method && request[method as Method]) 
            return midTryCatch(request[method as Method]!, error)
    
        return res.status( 400 ).json( { message: 'Endpoint don\'t exist' } )
    }
}