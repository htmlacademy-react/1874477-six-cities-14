import { ServerOffer } from '../types/offer';
import Card from './card';
import { useState } from 'react';

type OffersListProps = {
  offers: ServerOffer[];
};

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [offersData, setOffersData] = useState(offers);

  const handleFavoriteChange = (id: string, isFavorite: boolean) => {
    const updatedOffers = offersData.map((offer) => {
      if (offer.id === id) {
        return { ...offer, isFavorite };
      }
      return offer;
    });
    setOffersData(updatedOffers);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length > 1
            ? `${offers.length} places`
            : `${offers.length} place`}{' '}
          to stay in Amsterdam
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--closed">
            <li className="places__option places__option--active" tabIndex={0}>
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offersData.map((offer) => (
            <Card
              key={offer.id}
              offer={offer}
              handleFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );
}

export default OffersList;
