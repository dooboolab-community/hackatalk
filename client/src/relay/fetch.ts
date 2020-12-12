import * as Config from '../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchFunction } from 'relay-runtime';

const { GRAPHQL_URL } = Config;

type RequestProps = {
  method: string;
  headers: Record<string, string>;
  body: string | FormData | null;
};

const fetchGraphQL: FetchFunction = async (
  operation,
  variables,
  cacheConfig,
  uploadables,
) => {
  const config: RequestProps = {
    method: 'POST',
    headers: {
      Authorization:
        (await AsyncStorage.getItem('token')) || '',
      Accept: 'application/json',
    },
    body: '',
  };

  // When the `uploadables` are provided the [formData] is built following the GraphQL multipart request specification.
  // https://github.com/jaydenseric/graphql-multipart-request-spec

  if (uploadables) {
    const requestText = JSON.stringify(operation?.text?.replace(/\n/g, ''));
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
      query: operation.text,
      variables,
    });
  }

  return fetch(GRAPHQL_URL, config)
    .then((response) => response.json());
};

export default fetchGraphQL;
