import { ServerOffer } from '../types/offer';
import Card from './card';

type OffersListProps = {
  offers: ServerOffer[];
};

function OffersList({ offers }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default OffersList;
