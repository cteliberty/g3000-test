// import tiny from 'tiny-json-http';

export type DatocmsRequest = {
  query: string;
  variables?: {
    slug?: string;
    subSlug?: string;
    locale: string;
  };
  preview?: boolean;
  includeDrafts?: boolean
};

export type ResponseBodyQueryType = {
  data: any
}

export const performRequest = async (props: DatocmsRequest): Promise<ResponseBodyQueryType> => {

  const { query, variables = {}, includeDrafts = false } = props;
  console.log('==> query', query);

  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });

  console.log('response', response);
  
  const responseBody: ResponseBodyQueryType = await response.json();
  console.log('responseBody', responseBody);
  
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
