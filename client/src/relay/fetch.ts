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

    let map = '';

    if (uploadables.file) {
      // single upload
      map += `{ "${0}": ["variables.file"] }`;
      formData.append('map', map);
      formData.append('0', uploadables.file);
    } else {
      // multi uploads
      for (let i in uploadables.files) {
        map += `{ "${i}": ["variables.files.${i}"] }`;
        formData.append(i, uploadables.files[i]);
      }

      formData.append('map', map);
    }

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
