import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {LoadingIndicator, Typography, useTheme} from 'dooboo-ui';
import {
  MainStackNavigationProps,
  MainStackParamList,
} from '../navigations/MainStackNavigator';
import {PreloadedQuery, usePreloadedQuery, useQueryLoader} from 'react-relay';
import React, {ReactElement, Suspense, useEffect, useLayoutEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';

import ParsedText from 'react-native-parsed-text';
import {UserQuery} from '../../__generated__/UserQuery.graphql';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';
import {userQuery} from '../../relay/queries/User';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;

type UserProps = {
  queryReference: PreloadedQuery<UserQuery, Record<string, unknown>>;
};

type ProfileType =
  | 'organization'
  | 'about'
  | 'projects'
  | 'positions'
  | 'speakings'
  | 'contributions';

type ProfileListType = {
  type: ProfileType;
  value: string | null | undefined;
};

const ProfileList = ({type, value}: ProfileListType): ReactElement | null => {
  const {theme} = useTheme();
  const typeString =
    type === 'organization'
      ? getString('ORGANIZATION')
      : type === 'about'
      ? getString('ABOUT_ME')
      : type === 'projects'
      ? getString('PROJECTS')
      : type === 'positions'
      ? getString('POSITIONS')
      : type === 'speakings'
      ? getString('SPEAKINGS')
      : type === 'contributions'
      ? getString('CONTRIBUTIONS')
      : '';

  if (!typeString || !value) {
    return null;
  }

  return (
    <View
      style={{
        marginTop: 12,
        paddingHorizontal: 24,
        paddingVertical: 16,

        flexDirection: 'column',
      }}
    >
      <Typography.Body2
        style={{fontWeight: 'bold', marginBottom: 8, color: theme.info}}
      >
        {typeString}
      </Typography.Body2>
      <ParsedText
        style={{color: theme.text}}
        parse={[
          {
            type: 'url',
            onPress: (url) => Linking.openURL(url),
            style: {
              color: theme.button,
              textDecorationLine: 'underline',
            },
          },
        ]}
      >
        {value}
      </ParsedText>
    </View>
  );
};

const User = ({queryReference}: UserProps): ReactElement | null => {
  const {theme} = useTheme();
  const navigation = useNavigation<MainStackNavigationProps<'User'>>();
  const response = usePreloadedQuery<UserQuery>(userQuery, queryReference);
  const user = response.user;
  const name = user?.nickname || user?.name || undefined;

  useLayoutEffect(() => {
    if (name) {
      navigation.setOptions({
        headerTitle: name,
      });
    }
  }, [name, navigation]);

  if (!user) {
    return null;
  }

  const profile = user.profile;

  const pressProfileImage = async (): Promise<void> => {
    navigation.navigate('ImageSlider', {
      images: [{uri: user.photoURL, sender: name}],
    });
  };

  return (
    <Container>
      <ScrollView
        style={{flexDirection: 'row'}}
        contentContainerStyle={{
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            testID="button-user-icon"
            activeOpacity={0.5}
            style={{marginTop: 48}}
            onPress={pressProfileImage}
          >
            <ProfileImage
              testID="profile-image"
              resizeMode="cover"
              source={{uri: user.photoURL || ''}}
            />
          </TouchableOpacity>
          <Typography.Body2 style={{fontStyle: 'italic', marginTop: 4}}>
            {user.statusMessage}
          </Typography.Body2>
          <Typography.Body2 style={{marginTop: 4, color: theme.primary}}>
            {profile?.organization}
          </Typography.Body2>
        </View>
        <ProfileList type="about" value={profile?.about} />
        <ProfileList type="projects" value={profile?.projects} />
        <ProfileList type="contributions" value={profile?.contributions} />
        <ProfileList type="positions" value={profile?.positions} />
        <ProfileList type="speakings" value={profile?.speakings} />
      </ScrollView>
    </Container>
  );
};

const UserContainer = (): ReactElement => {
  const {
    params: {id},
  } = useRoute<RouteProp<MainStackParamList, 'User'>>();

  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<UserQuery>(userQuery);

  useEffect(() => {
    loadQuery({id});

    return () => {
      disposeQuery();
    };
  }, [disposeQuery, id, loadQuery]);

  return (
    <Container>
      <Suspense fallback={<LoadingIndicator />}>
        {queryReference && <User queryReference={queryReference} />}
      </Suspense>
    </Container>
  );
};

export default UserContainer;
