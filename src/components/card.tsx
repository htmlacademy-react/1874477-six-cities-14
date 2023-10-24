import { Link } from 'react-router-dom';
import { ServerOffer } from '../types/offer';
import { capitalizeFirstLetter } from '../utils/utils';
import { AppRoute } from '../const';
import classNames from 'classnames';

type CardProps = {
  offer: ServerOffer;
  handleFavoriteChange: (id: string, isFavorite: boolean) => void;
};

function Card({ offer, handleFavoriteChange }: CardProps): JSX.Element {
  const handleFavoriteClick = () => {
    const newIsFavorite = !offer.isFavorite;
    handleFavoriteChange(offer.id, newIsFavorite);
  };

  const mouseOverHandler = () => {
    // eslint-disable-next-line no-console
    // console.log(offer.id);
  };

  return (
    <article onMouseOver={mouseOverHandler} className="cities__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer.replace(':id', offer.id)}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={classNames('place-card__bookmark-button', 'button', {
              'place-card__bookmark-button--active': offer.isFavorite,
            })}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer.replace(':id', offer.id)}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default Card;
