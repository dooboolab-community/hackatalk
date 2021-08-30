import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {Snackbar, SnackbarContent, SnackbarRef, useTheme} from 'dooboo-ui';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';

// import {Theme} from '../theme';

declare type styles = {
  container?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
};

export interface SnackbarState extends SnackbarContent {
  testID?: string;
  zIndex?: number;
  styles?: styles;
}

export type SnackbarContext = {
  openSnackbar: (newSnackbarState: SnackbarState) => void;
};

const SnackbarContext = createContext<SnackbarContext>({
  openSnackbar: () => {},
});

export const SnackbarProvider: FC = (props) => {
  // const {theme} = useTheme();
  const [snackbarState, setSnackbarState] = useState<SnackbarState>();

  const snackbarRef = useRef<SnackbarRef>(null);

  const openSnackbar = useCallback(
    (newSnackbarState: SnackbarState): void => {
      setSnackbarState(newSnackbarState);

      const {text, timer, styles, actionText, onActionPress, type} =
        newSnackbarState;

      snackbarRef.current?.show({
        text,
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
      }}>
      {props.children}
      <View style={{zIndex: snackbarState?.zIndex}}>
        <Snackbar
          testID={snackbarState?.testID}
          // theme={snackbarState?.styles ?? theme}
          ref={snackbarRef}
        />
      </View>
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = (): SnackbarContext =>
  useContext(SnackbarContext);
