import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { memo } from 'react';
import { getSelectedCity } from '../../store/slice/offers/selectors';

function LogoComponent(): JSX.Element {
  const cityState = useAppSelector(getSelectedCity);

  return (
    <div className="header__left">
      <Link className="header__logo-link header__logo-link--active" to={`/${cityState}`}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>
    </div>
  );
}

export const Logo = memo(LogoComponent);
