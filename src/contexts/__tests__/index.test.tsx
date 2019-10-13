import { StateProvider, useStateValue } from '..';
import { Text, View } from 'react-native';
import { act, renderHook } from '@testing-library/react-hooks';
import { getByTestId, render, waitForElement } from '../../../test/test-utils';

import ProfileModal from '../../components/shared/ProfileModal';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../types';
import { createTheme } from '../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any = {
  navigation: {
    navigate: jest.fn(),
  },
};

describe('[AppProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;
  const component = (
    <StateProvider>
      <View>
        <Text>Placeholding Children</Text>
      </View>
    </StateProvider>
  );

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[StateProvider] interactions', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  const component = (
    <StateProvider>
      <View>
        <Text>Placeholding Children</Text>
      </View>
    </StateProvider>
  );

  const user = {
    uid: 'testID',
    displayName: 'dooboolab',
    photoURL: 'testPhotoURL',
    statusMsg: 'testing',
  };

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    rendered = renderer.create(component);
    root = rendered.root;
  });

  const Wrapper = ({ children }): React.ReactElement => (
    <StateProvider>{children}</StateProvider>
  );

  const { result } = renderHook(() => useStateValue(), { wrapper: Wrapper });

  it('should change the theme to dark from light, which is default.: ', () => {
    act(() => {
      const [, dispatch] = result.current;
      dispatch({
        type: 'change-theme-mode',
        payload: {
          theme: ThemeType.DARK,
        },
      });
    });

    const [{ theme }] = result.current;
    expect(theme).toBe(ThemeType.DARK);
  });

  it('should test show-modal dispatch action: ', async () => {
    const ModalTestComp = ({ children }): React.ReactElement => {
      const [
        {
          profileModal: { modal },
        },
      ] = useStateValue();
      return (
        <Wrapper>
          <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
            <>
              {children}
              <ProfileModal
                testID="modal"
                ref={modal}
                onChatPressed={(): void => {
                  if (modal && modal.current) {
                    modal.current.close();
                  }
                }}
              />
            </>
          </ThemeProvider>
        </Wrapper>
      );
    };

    const { result } = renderHook(() => useStateValue(), {
      wrapper: ModalTestComp,
    });

    /* const { getByTestId } = render(
      <ModalTestComp>
        <View>
          <Text>Placeholding Children</Text>
        </View>
      </ModalTestComp>,
    ); */

    act(() => {
      const [, dispatch] = result.current;
      dispatch({
        type: 'show-modal',
        payload: {
          user,
          deleteMode: true,
        },
      });
    });

    const [
      {
        profileModal: { user: modalUser, deleteMode, modal },
      },
    ] = result.current;

    expect(deleteMode).toBe(false);
    expect(modalUser).toBe(user);

    // TODO: please help with test code for modal opening and closing! I give up.
    // const modalComp = await waitForElement(() => getByTestId('modal'))
    // expect(modalComp).toBeTruthy()
  });

  // it('should trigger [resetUser] action', () => {
  //   let instance = root.instance;
  //   instance.actions.resetUser();
  // });

  // it('should check trigger actions when method called', () => {
  //   let instance = root.instance;
  //   instance.actions.setUser({
  //     displayName: '',
  //     age: 0,
  //     job: '',
  //   });
  // });
});
