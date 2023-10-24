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
    <div className="cities__places-list places__list tabs__content">
      {offersData.map((offer) => (
        <Card key={offer.id} offer={offer} handleFavoriteChange={handleFavoriteChange} />
      ))}
    </div>
  );
}

export default OffersList;
