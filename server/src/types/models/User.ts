import { objectType } from '@nexus/schema';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id();
    t.model.socialId();
    t.model.authType();
    t.model.verified();
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.nickname();
    t.model.thumbURL();
    t.model.photoURL();
    t.model.birthDay();
    t.model.gender();
    t.model.phone();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.model.posts({ pagination: false });
    t.model.profile({
      type: 'Profile',
    });
  },
});
