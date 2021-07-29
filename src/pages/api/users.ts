import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

interface User {
    name: string;
    email: string;
    mobile?: string;
    product: string;
    paymentMethod: string;
}

export default async function registerUserinFauna(values: User) {
    try {
        console.log('try2')
        await fauna.query(
            q.Create(
                q.Collection('users'),
                {
                    data: { ...values, product: Array(values.product) }
                }
            )
        )
        console.log(values);
    } catch (err) {
        throw new Error(err);
    }
}