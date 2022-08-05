import { Client } from 'faunadb';

export const faunadbClient = new Client({
  secret: process.env.FAUNADB_KEY,
});
