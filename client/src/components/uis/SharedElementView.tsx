import type {FC, ReactElement, ReactNode} from 'react';

import {Platform} from 'react-native';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';

type Props = {id: string; children: ReactNode};

const SharedElementView: FC<Props> = ({id, children}) => {
  return Platform.select({
    web: children as ReactElement,
    default: <SharedElement id={id}>{children}</SharedElement>,
  });
};

export default SharedElementView;
