import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { ApiState } from 'types/apiState';
import { CrossSlopeFeature } from 'types/crossSlope/CrossSlopeFeature';
import { CrossSlopeState } from 'types/crossSlope/CrossSlopeState';

import { fetchCrossSlopeDataApi } from './api';

export const initialState: CrossSlopeState = {
  crossSlopeFeatures: [],
  service: undefined,
  status: ApiState.idle,
  isLoading: false,
  error: undefined,
};

export const fetchCrossSlopeFeatures = createAsyncThunk(
  'fetchCrossSlopeFeatures',
  async () => {
    const response = await fetchCrossSlopeDataApi();
    const results = response.data.map((item: any) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [Number(item['Longitude']), Number(item['Latitude'])],
        },
        properties: {
          id: item['Id'],
          cross: Number(item['Cross']),
        },
      };
    });
    return results;
  },
);

export const crossSlopeSlice = createSlice({
  name: 'crossSlope',
  initialState,
  reducers: {
    setCrossSlopeFeatures: (
      state,
      action: PayloadAction<CrossSlopeFeature[]>,
    ) => {
      state.crossSlopeFeatures = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCrossSlopeFeatures.pending, state => {
      state.crossSlopeFeatures = [];
      state.isLoading = true;
      state.service = 'fetchCrossSlopeFeatures';
      state.status = ApiState.pending;
      state.error = undefined;
    });
    builder.addCase(
      fetchCrossSlopeFeatures.fulfilled,
      (state, action: PayloadAction<CrossSlopeFeature[]>) => {
        state.crossSlopeFeatures = action.payload;
        state.isLoading = false;
        state.status = ApiState.fulfilled;
        state.error = undefined;
      },
    );
    builder.addCase(fetchCrossSlopeFeatures.rejected, (state, action: any) => {
      state.isLoading = false;
      state.status = ApiState.rejected;
      state.error = action.error;
    });
  },
});

export const { setCrossSlopeFeatures } = crossSlopeSlice.actions;

export const crossSlopeSelector = (state: RootState) =>
  state?.crossSlope ?? initialState;
