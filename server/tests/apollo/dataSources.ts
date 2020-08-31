import UserAPI from './userAPI';

const dataSources = ():any => ({
  userAPI: new UserAPI(),
});

export default dataSources;
