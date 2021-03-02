import * as Config from '../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {FetchFunction} from 'relay-runtime';

const {GRAPHQL_URL} = Config;

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
      Authorization: (await AsyncStorage.getItem('token')) || '',
      Accept: 'application/json',
    },
    body: '',
  };

  // When the `uploadables` are provided the [formData] is built following the GraphQL multipart request specification.
  // https://github.com/jaydenseric/graphql-multipart-request-spec

  if (uploadables) {
    const formData = new FormData();

    const requestText = operation?.text?.replace(/\n/g, '');

    const query = JSON.stringify({
      query: requestText,
      variables,
    });

    formData.append('operations', query);

    let map: {[key: number]: string[]} = {};

    let idx = 0;
    const prefix = 'variables';

    Object.keys(uploadables).forEach((field: string) => {
      const files = uploadables[field];

      if (Array.isArray(files))
        // multi uploads
        for (let i in files) {
          map[idx] = [`${prefix}.${field}.${i}`];
          formData.append(`${idx}`, files[i]);
          idx++;
        }
      else {
        // single upload
        map[idx] = [`${prefix}.${field}`];
        formData.append(`${idx}`, files);
        idx++;
      }
    });

    formData.append('map', JSON.stringify(map));

    config.body = formData;
  } else {
    config.headers['Content-Type'] = 'application/json';

    config.body = JSON.stringify({
      query: operation.text,
      variables,
    });
  }

  return fetch(GRAPHQL_URL, config).then((response) => response.json());
};

export default fetchGraphQL;
