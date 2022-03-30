import {graphql} from 'react-relay';

export const singleUpload = graphql`
  mutation UploadSingleUploadMutation($file: Upload!, $dir: String) {
    singleUpload(file: $file, dir: $dir)
  }
`;
