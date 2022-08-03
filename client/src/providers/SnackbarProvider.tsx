import React, {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {Snackbar, SnackbarContent, SnackbarRef} from 'dooboo-ui';

import {Theme} from '../theme';
import {View} from 'react-native';

export interface SnackbarState extends SnackbarContent {
  testID?: string;
  zIndex?: number;
  theme?: Theme;
}

export type SnackbarContext = {
  openSnackbar: (newSnackbarState: SnackbarState) => void;
};

const SnackbarContext = createContext<SnackbarContext>({
  openSnackbar: () => {},
});

type Props = {
  children: ReactNode;
};

export const SnackbarProvider = (props: Props): ReactElement => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>();

  const snackbarRef = useRef<SnackbarRef>(null);

  const openSnackbar = useCallback(
    (newSnackbarState: SnackbarState): void => {
      setSnackbarState(newSnackbarState);

      const {content, timer, styles, actionText, onActionPress, type} =
        newSnackbarState;

      snackbarRef.current?.show({
        content,
        timer,
        styles,
        actionText,
        onActionPress,
        type,
      });
    },
    [snackbarRef, setSnackbarState],
  );

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
      }}
    >
      {props.children}
      <View style={{zIndex: snackbarState?.zIndex}}>
        <Snackbar testID={snackbarState?.testID} ref={snackbarRef} />
      </View>
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = (): SnackbarContext =>
  useContext(SnackbarContext);
