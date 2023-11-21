import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types-ts/offer';
import { fetchFavoriteOffers, setFavoriteOffer } from '../thunk/favorite';

interface FavoriteOffersState {
  offers: ServerOffer[];
  isOffersLoading: boolean;
  count: number;
  countId: string[];
}

const initialState: FavoriteOffersState = {
  offers: [],
  isOffersLoading: false,
  count: 0,
  countId: [],
};

const processSuccess = (state: FavoriteOffersState, action: PayloadAction<ServerOffer[]>) => {
  state.offers = action.payload;
  state.isOffersLoading = false;
  state.count = action.payload.length;
};


const processFailed = (state: FavoriteOffersState) => {
  state.isOffersLoading = false;
};

const processPending = (state: FavoriteOffersState) => {
  state.isOffersLoading = true;
};

export const favoriteOffersSlice = createSlice({
  name: 'favoriteOffers',
  initialState,
  reducers: {
    setFavorite(state, action: PayloadAction<string>) {
      const offerId = action.payload;
      const foundOffer = state.offers.find((offer) => offer.id === offerId);

      if (foundOffer) {
        foundOffer.isFavorite = !foundOffer.isFavorite;
      }
      fetchFavoriteOffers();
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const offerId = action.payload;
      const foundIndex = state.offers.findIndex((offer) => offer.id === offerId);

      if (foundIndex !== -1) {
        state.offers[foundIndex].isFavorite = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteOffers.pending, processPending);
    builder.addCase(fetchFavoriteOffers.fulfilled, processSuccess);
    builder.addCase(fetchFavoriteOffers.rejected, processFailed);
    builder.addCase(setFavoriteOffer.fulfilled, (state, action) => {
      const status = action.meta.arg.status;
      const offerId = action.meta.arg.offerId;

      switch (status) {
        case 1:
          if (!state.countId.includes(offerId)) {
            state.count += 1;
            state.countId.push(offerId);
          }
          break;
        case 0:
          if (state.countId.includes(offerId)) {
            state.count -= 1;
            state.countId = state.countId.filter((id) => id !== offerId);
          }
          break;
        default:
          break;
      }

      fetchFavoriteOffers();
    });
  }
});

export const favoriteOffersExtraAction = { fetchFavoriteOffers, setFavoriteOffer };
export const favoriteOffersAction = favoriteOffersSlice.actions;
