import { CacheConfig, GraphQLResponse, RequestParameters, Variables } from 'relay-runtime';

const FETCH_URL = 'https://hackatalk.azurewebsites.net/graphql';

export type FetchArgProps = {
  request: RequestParameters;
  variables: Variables;
  cacheConfig: CacheConfig;
  token?: string | null;
};

function fetchGraphQL(args: FetchArgProps): Promise<GraphQLResponse> {
  const { request, variables, cacheConfig, token } = args;
  console.log(`fetching query ${request.name} with ${JSON.stringify(variables)}`);
  const fetchConfig = {
    method: 'POST',
    headers: {
      Authorization: token || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  };
  return fetch(FETCH_URL, fetchConfig).then((response) => response.json());
}

export default fetchGraphQL;
