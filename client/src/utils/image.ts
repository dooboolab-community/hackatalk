import * as ImageManipulator from 'expo-image-manipulator';

import { Image } from 'react-native';

// eslint-disable-next-line no-shadow
enum PhotoDimensions {
  WIDTH = 'width',
  HEIGHT = 'height',
}

const maximalValuesPerDimension = { width: 1000, height: 1000 };

export interface ImageSize {
  width: number;
  height: number;
}

export const getOriginalImageSize = async (
  imageUri: string,
): Promise<ImageSize> =>
  new Promise<ImageSize>((resolve, reject) =>
    Image.getSize(
      imageUri,
      (width: number, height: number) =>
        resolve({
          width,
          height,
        }),
      reject,
    ),
  );

export const resizePhotoToMaxDimensionsAndCompressAsPNG = async ({
  uri,
  width = 1280,
  height = 1280,
}: {
  uri: string;
  width?: number;
  height?: number;
}): Promise<ImageManipulator.ImageResult> => {
  // 1. define the maximal dimension and the allowed value for it
  const largestDimension =
    width > height ? PhotoDimensions.WIDTH : PhotoDimensions.HEIGHT;

  const initialValueOfLargestDimension = (await getOriginalImageSize(uri))[
    largestDimension
  ];

  const maximalAllowedValueOfLargestDimension =
    maximalValuesPerDimension[largestDimension];

  const targetValueOfLargestDimension =
    initialValueOfLargestDimension > maximalAllowedValueOfLargestDimension
      ? maximalAllowedValueOfLargestDimension
      : initialValueOfLargestDimension;

  const resizedPhoto = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { [largestDimension]: targetValueOfLargestDimension } }],
    { compress: 1.0, format: ImageManipulator.SaveFormat.PNG },
  );

  return resizedPhoto;
};
