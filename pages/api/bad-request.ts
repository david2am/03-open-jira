import type { NextApiRequest, NextApiResponse } from 'next'
import { Entry } from '../../models'

type Data = {
    ok: boolean;
    message: string | string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { message = 'Bad Request' } = req.query

    res.status(400).json({
        ok: false,
        message
     })
}