const CARDS_COUNT: number = 2;

const APP_NAME: string = '6 cities';

enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Error = '/error'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export { CARDS_COUNT, AppRoute, AuthorizationStatus, APP_NAME };
