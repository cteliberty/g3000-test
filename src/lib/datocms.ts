const { config } = require('dotenv');

config({
  path: `.env.${process.env.NODE_ENV}`,
});
config({ path: '.env.dev', override: true });

export type DatocmsRequest = {
  query: string;
  variables?: {
    slug?: string;
    subSlug?: string;
    locale?: string;
  };
  preview?: boolean;
  includeDrafts?: boolean
};

export type ResponseBodyQueryType = {
  data: any
}

export const performRequest = async (props: DatocmsRequest): Promise<ResponseBodyQueryType> => {

  const { query, variables = {}, includeDrafts = false } = props;


  let endpoint = 'https://graphql.datocms.com';

  if (process.env.NEXT_DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.NEXT_DATOCMS_ENVIRONMENT}`;
  }

  // if (preview) {
  //   endpoint += `/preview`;
  // }

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });

  const responseBody: ResponseBodyQueryType = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(responseBody)}`);
  }

  return responseBody;
}

// export async function request(props: DatocmsRequest) {
//   const { query, variables, preview } = props;

//   let endpoint = 'https://graphql.datocms.com';

//   if (process.env.NEXT_DATOCMS_ENVIRONMENT) {
//     endpoint += `/environments/${process.env.NEXT_DATOCMS_ENVIRONMENT}`;
//   }

//   if (preview) {
//     endpoint += `/preview`;
//   }

//   const { body } = await tiny.post({
//     url: endpoint,
//     headers: {
//       authorization: `Bearer ${process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN}`,
//     },
//     data: {
//       query,
//       variables,
//     },
//   });

//   if (body.errors) {
//     console.error('Ouch! The query has some errors!');
//     throw body.errors;
//   }

//   return body.data;
// }
