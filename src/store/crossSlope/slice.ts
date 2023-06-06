import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { ApiState } from 'types/apiState';
import { CrossSlopeFeature } from 'types/crossSlope/CrossSlopeFeature';
import { CrossSlopeState } from 'types/crossSlope/CrossSlopeState';

import { fetchCrossSlopeDataApi, updateCrossSlopeDataApi } from './api';

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

export const updateCrossSlopeFeature = createAsyncThunk(
  'updateCrossSlopeFeature',
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await updateCrossSlopeDataApi(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
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

    // update cross slope Feature

    builder.addCase(updateCrossSlopeFeature.pending, state => {
      state.service = 'updateCrossSlopeFeature';
      state.status = ApiState.pending;
      state.error = undefined;
    });
    builder.addCase(updateCrossSlopeFeature.fulfilled, state => {
      state.status = ApiState.fulfilled;
      state.error = undefined;
    });
    builder.addCase(updateCrossSlopeFeature.rejected, (state, action: any) => {
      state.status = ApiState.rejected;
      state.error = action.error;
    });
  },
});

export const { setCrossSlopeFeatures } = crossSlopeSlice.actions;

export const crossSlopeSelector = (state: RootState) =>
  state?.crossSlope ?? initialState;
