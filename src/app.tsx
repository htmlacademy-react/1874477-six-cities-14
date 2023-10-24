import MainScreen from './pages/main';
import { AppRoute, AuthorizationStatus } from './const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Offer from './pages/offer';
import Favorities from './pages/favorities';
import Error from './pages/error';
import PrivateRoute from './components/private-route';
import { ServerOffer } from './types/offer';

type AppScreenProps = {
  offers: ServerOffer[];
}

function App({offers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen offers={offers} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><Favorities offers={offers} /></PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Offer offers={offers} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
