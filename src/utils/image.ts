import * as ImageManipulator from 'expo-image-manipulator';

import { Image } from 'react-native';

const DEFAULT = {
  IMAGE_WIDTH: 300,
  IMAGE_HEIGHT: 300,
};

export interface ImageSize {
  width: number;
  height: number;
}

export const resizeImage = async ({
  imageUri,
  maxWidth,
  maxHeight,
}: {
  imageUri: string;
  maxWidth?: number;
  maxHeight?: number;
}): Promise<ImageManipulator.ImageResult> => {
  const getOriginalSize = (imageUri: string): Promise<ImageSize> => new Promise<ImageSize>(
    (resolve, reject) => Image.getSize(
      imageUri,
      (width: number, height: number) => resolve({
        width,
        height,
      }),
      reject,
    ),
  );

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

  const { width: originWidth, height: originHeight } = await getOriginalSize(imageUri);

  if (originWidth >= originHeight) {
    if (maxWidth === undefined || maxWidth === null) {
      return manipulate({ width: DEFAULT.IMAGE_WIDTH });
    }

    if (maxWidth !== undefined && originWidth < maxWidth) {
      return manipulate({ width: originWidth });
    }

    return manipulate({ width: maxWidth });
  }

  if (maxHeight === undefined || maxHeight === null) {
    return manipulate({ height: DEFAULT.IMAGE_HEIGHT });
  }

  if (originHeight < maxHeight) {
    return manipulate({ height: originHeight });
  }

  return manipulate({ height: maxHeight });
};
