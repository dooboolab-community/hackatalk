import { GraphQLClient, request } from 'graphql-request';
import {
  createDraftMutation,
  deletePostMutation,
  feedQuery,
  filterPostsQuery,
  postQuery,
  publishMutation,
  signUpMutation,
} from './setup/queries';

import { testHost } from './setup/testSetup';

let client: GraphQLClient;

const userVariables = {
  user: {
    name: 'dooboo1',
    email: 'dooboo@dooboolab.com',
    password: 'password',
  },
};

describe('Resolver - Post', () => {
  it('should signUp user', async () => {
    const response = await request(testHost, signUpMutation, userVariables);

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('token');
    expect(response.signUp).toHaveProperty('user');
    expect(response.signUp.user.email).toEqual(userVariables.user.email);

    // hyochan => Setup auth client for next test case
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: response.signUp.token,
      },
    });
  });

  describe('Resolver - after signIn', () => {
    it('should create auth user`s draft', async () => {
      const variables = {
        title: 'title',
        content: 'content',
      };

      const response = await client.request(createDraftMutation, variables);
      expect(response).toHaveProperty('createDraft');
      expect(response.createDraft).toHaveProperty('id');
      expect(response.createDraft.title).toEqual('title');
    });

    it('should publish user`s draft', async () => {
      const variables = {
        id: 1,
      };

      const response = await client.request(publishMutation, variables);
      expect(response).toHaveProperty('publish');
      expect(response.publish).toHaveProperty('id');
      expect(response.publish.title).toEqual('title');
    });

    it('should query feed', async () => {
      const response = await client.request(feedQuery);

      expect(response).toHaveProperty('feed');
      expect(response.feed).toHaveLength(1);
    });

    it('should query post', async () => {
      const response = await client.request(postQuery, {
        id: 1,
      });

      expect(response).toHaveProperty('post');
    });

    it('should filter posts', async () => {
      const response = await client.request(filterPostsQuery, {
        searchString: 'title',
      });

      expect(response).toHaveProperty('filterPosts');
    });

    it('should delete user`s draft', async () => {
      const variables = {
        id: 1,
      };

      const response = await client.request(deletePostMutation, variables);
      expect(response).toHaveProperty('deletePost');
      expect(response.deletePost).toHaveProperty('id');
      expect(response.deletePost.id).toEqual(1);
    });

    it('should query feed after deletion', async () => {
      const response = await client.request(feedQuery);

      expect(response).toHaveProperty('feed');
      expect(response.feed).toHaveLength(0);
    });
  });
});
