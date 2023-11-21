import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { ServerOffer } from '../../types-ts/offer';
import { clearError, fetchAllOffers, fetchOneOffer } from '../thunk/offers';

interface OffersState {
  offers: ServerOffer[];
  offer?: ServerOffer;
  city: string;
  activePoint?: string;
  isOffersLoading: boolean;
  error: string | null;
  redirectToErrorPage: boolean;
}

const initialState: OffersState = {
  offers: [],
  offer: undefined,
  city: DEFAULT_CITY,
  activePoint: undefined,
  isOffersLoading: false,
  error: null,
  redirectToErrorPage: false,
};

const processOneOfferSuccess = (state: OffersState, action: PayloadAction<ServerOffer>) => {
  state.offer = action.payload;
  state.isOffersLoading = false;
};

const processSuccess = (state: OffersState, action: PayloadAction<ServerOffer[]>) => {
  state.offers = action.payload;
  state.isOffersLoading = false;
};


const processFailed = (state: OffersState) => {
  state.isOffersLoading = false;
  state.redirectToErrorPage = true;
  clearError();
};

const proccesPending = (state: OffersState) => {
  state.isOffersLoading = true;
};

export const offersSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchAllOffers.pending, proccesPending);
    builder.addCase(fetchAllOffers.fulfilled, processSuccess);
    builder.addCase(fetchAllOffers.rejected, processFailed);
    builder.addCase(fetchOneOffer.pending, proccesPending);
    builder.addCase(fetchOneOffer.fulfilled, processOneOfferSuccess);
    builder.addCase(fetchOneOffer.rejected, processFailed);
  },
  name: 'offers',
  initialState,
  reducers: {
    setCitySelect(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setFavorite(state, action: PayloadAction<string>) {
      const offerId = action.payload;
      const foundOffer = state.offers.find((offer) => offer.id === offerId);

      if (foundOffer) {
        foundOffer.isFavorite = !foundOffer.isFavorite;
      }
    },
    setActivePoint(state, action: PayloadAction<string>) {
      state.activePoint = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setOneOfferFavorite: (state, action: PayloadAction<ServerOffer>) => {
      if (state.offer) {
        state.offer.isFavorite = !action.payload.isFavorite;
      }
    },
    resetRedirectToErrorPage: (state) => {
      state.redirectToErrorPage = false;
    },
  }
});

export const offersExtraAction = { fetchAllOffers, fetchOneOffer };
export const offersAction = offersSlice.actions;
