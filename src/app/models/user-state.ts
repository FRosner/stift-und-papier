import {User} from '@src/app/models/user';

export interface LoggedIn {
  type: UserStateType.LOGGED_IN;
  user: User;
}

export interface NotLoggedIn {
  type: UserStateType.NOT_LOGGED_IN;
}

export interface Loading {
  type: UserStateType.LOADING;
}

export type UserState = LoggedIn | NotLoggedIn | Loading;

export enum UserStateType {
  LOGGED_IN = 'LoggedIn',
  NOT_LOGGED_IN = 'NotLoggedIn',
  LOADING = 'Loading',
}

export const UserState = {
  loggedIn: (user: User) => <LoggedIn>{
    type: UserStateType.LOGGED_IN,
    user: user,
  },
  notLoggedIn: <NotLoggedIn>{type: UserStateType.NOT_LOGGED_IN},
  loading: <Loading>{type: UserStateType.LOADING},
};

export function isLoggedIn(user: UserState): user is LoggedIn {
  return user.type === UserStateType.LOGGED_IN;
}
