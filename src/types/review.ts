import { User } from './user';

type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type { Review };
