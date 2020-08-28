import UserAPI from './UserAPI';

const dataSources = ():any => ({
  userAPI: new UserAPI(),
});

export default dataSources;
