import { Link } from 'react-router-dom';
import { ServerOffer } from '../types/offer';
import { capitalizeFirstLetter } from '../utils/utils';
import { useState } from 'react';
import { AppRoute } from '../const';

type CardProps = {
  offer: ServerOffer;
};

function Card({ offer }: CardProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  const clickFavoriteHandler = () => {
    setIsFavorite(!isFavorite);
  };

  const mouseOverHandler = () => {
    // eslint-disable-next-line no-console
    console.log(offer.id);
  };

  return (
    <article onMouseOver={mouseOverHandler} className="cities__card place-card">
      {offer.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={clickFavoriteHandler}
            className={`place-card__bookmark-button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
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
          <Link to={`${AppRoute.Offer.replace(':id', String(offer.id))}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default Card;
