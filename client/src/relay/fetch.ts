import * as Config from '../../config';

import AsyncStorage from '@react-native-community/async-storage';
import { FetchFunction } from 'relay-runtime';

const { GRAPHQL_URL } = Config;

type RequestProps = {
  method: string;
  headers: Record<string, string>;
  body: string | FormData | null;
};

const fetchGraphQL: FetchFunction = async (
  request,
  variables,
  cacheConfig,
  uploadables,
) => {
  console.log(`fetching ${request.name} with ${JSON.stringify(variables)}`);

  const config: RequestProps = {
    method: 'POST',
    headers: {
      Authorization:
        (await AsyncStorage.getItem('token')) || '',
    },
    body: '',
  };
  // When the `uploadables` are provided the [formData] is builded following the GraphQL multipart request specification.
  // https://github.com/jaydenseric/graphql-multipart-request-spec
  if (uploadables) {
    const requestText = JSON.stringify(request?.text?.replace(/\n/g, ''));
    const { file, dir } = variables;

    const formData = new FormData();
    formData.append(
      'operations',
      `{"query": ${requestText}, "variables": {"file": ${file}, "dir": ${JSON.stringify(dir)}} }`,
    );
    formData.append('map', '{ "0": ["variables.file"] }');
    formData.append('0', uploadables.file);

    config.body = formData;
  } else {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify({
      query: request.text,
      variables,
    });
  }
  return fetch(GRAPHQL_URL, config)
    .then((response) => response.json());
};

export default fetchGraphQL;
