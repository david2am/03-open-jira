import { NextApiRequest, NextApiResponse } from "next/types";

export type Method = 'GET' | 'POST' | 'PUT' |  'DELETE'

export type Request = {
    [Property in Method]?: (( req: NextApiRequest, res: NextApiResponse<any>, id?: string ) => Promise<void>)
}

export type Error = {
    status: number;
    message: string;
}