import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("api")
    if (req.method = "POST") {
        console.log(req, 'req')
        console.log('if')


        const query = await fauna.query(
            q.Create(
                q.Collection('users'),
                {
                    data: { ...req.body, product: Array(req.body.product) }
                }
            )
        );

        const { data } = query;


        res.status(200).json({ data });
    } else {
        res.setHeader("Allow", "POST")
        res.status(405).send("Method not allowed");
    }

}