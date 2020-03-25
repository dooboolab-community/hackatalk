import * as ImageManipulator from 'expo-image-manipulator';

import { Image } from 'react-native';

const DEFAULT = {
  IMAGE_MAX_WIDTH: 300,
  IMAGE_MAX_HEIGHT: 300,
};

export interface ImageSize {
  width: number;
  height: number;
}

export const getOriginalImageSize = async (imageUri: string): Promise<ImageSize> => new Promise<ImageSize>(
  (resolve, reject) => Image.getSize(
    imageUri,
    (width: number, height: number) => resolve({
      width,
      height,
    }),
    reject,
  ),
);

export const resizeImage = async ({
  imageUri,
  maxWidth,
  maxHeight,
}: {
  imageUri: string;
  maxWidth?: number;
  maxHeight?: number;
}): Promise<ImageManipulator.ImageResult> => {
  const manipulate = ({
    width,
    height,
  }: {
    width?: number;
    height?: number;
  }): Promise<ImageManipulator.ImageResult> => ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width, height } }],
    { compress: 1, format: ImageManipulator.SaveFormat.PNG },
  );

  const { width: originWidth, height: originHeight } = await getOriginalImageSize(imageUri);

  if (originWidth >= originHeight) {
    if (maxWidth === undefined || maxWidth === null) {
      if (originWidth < DEFAULT.IMAGE_MAX_WIDTH) {
        return manipulate({ width: originWidth });
      }

      return manipulate({ width: DEFAULT.IMAGE_MAX_WIDTH });
    }

    if (originWidth < maxWidth) {
      return manipulate({ width: originWidth });
    }

    return manipulate({ width: maxWidth });
  }

  if (maxHeight === undefined || maxHeight === null) {
    if (originHeight < DEFAULT.IMAGE_MAX_HEIGHT) {
      return manipulate({ height: originHeight });
    }

    return manipulate({ height: DEFAULT.IMAGE_MAX_HEIGHT });
  }

  if (originHeight < maxHeight) {
    return manipulate({ height: originHeight });
  }

  return manipulate({ height: maxHeight });
};
