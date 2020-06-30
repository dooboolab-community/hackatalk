import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { FetchFunction } from 'relay-runtime';

const { GRAPHQL_URL } = Config;

const fetchGraphQL: FetchFunction = async (request, variables) => {
  console.log(
    `fetching query ${request.name} with ${JSON.stringify(variables)}`,
  );
  const authorization = (await AsyncStorage.getItem('token')) || '';
  const config = {
    method: 'POST',
    headers: {
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  };
  return fetch(GRAPHQL_URL, config).then((response) => response.json());
};

export default fetchGraphQL;
