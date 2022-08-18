import * as prismic from '@prismicio/client';

export const createClient = () => {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return client;
};
