type ServerUser = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}

type User = Omit<ServerUser, 'email' | 'token'>;

type AuthServerUser = Pick<ServerUser, 'email'> & {
  password: string;
}

export type { ServerUser, User, AuthServerUser };
