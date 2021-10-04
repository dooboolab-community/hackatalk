import {VideoThumbnailsResult} from 'expo-video-thumbnails';

export const getThumbnailAsync = (
  uri: string,
): Promise<VideoThumbnailsResult> => {
  return new Promise((resolve, reject) => {
    if (uri)
      resolve({
        uri: 'https://i.picsum.photos/id/344/200/300.jpg?hmac=hFZM-uJoRMyNATe_kjGvS2NGGP60jqqP64vpGQ98VAo',
        width: 200,
        height: 300,
      });
    else reject({error: 'no uri'});
  });
};
