import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { ApiState } from 'types/apiState';
import { HazardCategory } from 'types/hazard/HazardCategories';
import { HazardFeature } from 'types/hazard/HazardFeature';
import { HazardState } from 'types/hazard/HazardState';
import { HazardType } from 'types/hazard/HazardType';

import {
  fetchHazardDataApi,
  fetchHazardTypesApi,
  fetchHazardCategoriesApi,
  updateHazardDataApi,
} from './api';

export const initialState: HazardState = {
  hazardFeatures: [],
  hazardCategories: [],
  hazardTypes: [],
  service: undefined,
  status: ApiState.idle,
  isLoading: false,
  error: undefined,
};

export const fetchHazardFeatures = createAsyncThunk(
  'fetchHazardFeatures',
  async () => {
    const response = await fetchHazardDataApi();
    const results = response.data.map((item: any) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [Number(item['Longitude']), Number(item['Latitude'])],
        },
        properties: {
          id: item['Id'],
          categoryId: item['Category']['Id'],
          category: item['Category']['Name'],
          hazardTypeId: item['HazardType']['Id'],
          hazardType: item['HazardType']['Name'],
          gpsTime: item['GPSTime'],
          comment: item['Comment'],
          photoUrl: item['PhotoUrl'],
          pdfUrl:
            item['AttachmentDetails'] && item['AttachmentDetails'].length > 0
              ? item['AttachmentDetails'][0]['Url']
              : null,
        },
      };
    });
    return results;
  },
);

export const fetchHazardCategories = createAsyncThunk(
  'fetchHazardCategories',
  async () => {
    const response = await fetchHazardCategoriesApi();
    const items = (response as any).ReturnModel.Items;
    const results = items.map((item: any) => {
      return {
        Id: item.Id,
        Name: item.Name,
      };
    });
    return results;
  },
);

export const fetchHazardTypes = createAsyncThunk(
  'fetchHazardTypes',
  async () => {
    const response = await fetchHazardTypesApi();
    const items = (response as any).ReturnModel.Items;
    const results = items.map((item: any) => {
      return {
        Id: item.Id,
        Name: item.Name,
      };
    });
    return results;
  },
);

export const updateHazardFeature = createAsyncThunk(
  'updateHazardFeature',
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await updateHazardDataApi(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const hazardSlice = createSlice({
  name: 'harzard',
  initialState,
  reducers: {
    setHazardFeatures: (state, action: PayloadAction<HazardFeature[]>) => {
      state.hazardFeatures = action.payload;
    },
  },
  extraReducers: builder => {
    // fetch hazardFeatures
    builder.addCase(fetchHazardFeatures.pending, state => {
      state.hazardFeatures = [];
      state.isLoading = true;
      state.service = 'fetchHazardFeatures';
      state.status = ApiState.pending;
      state.error = undefined;
    });
    builder.addCase(
      fetchHazardFeatures.fulfilled,
      (state, action: PayloadAction<HazardFeature[]>) => {
        state.hazardFeatures = action.payload;
        state.isLoading = false;
        state.status = ApiState.fulfilled;
        state.error = undefined;
      },
    );
    builder.addCase(fetchHazardFeatures.rejected, (state, action: any) => {
      state.isLoading = false;
      state.status = ApiState.rejected;
      state.error = action.error;
    });

    // fetch hazard categories
    builder.addCase(fetchHazardCategories.pending, state => {
      state.hazardFeatures = [];
      state.service = 'fetchHazardCategories';
      state.status = ApiState.pending;
      state.error = undefined;
    });
    builder.addCase(
      fetchHazardCategories.fulfilled,
      (state, action: PayloadAction<HazardCategory[]>) => {
        state.hazardCategories = action.payload;
        state.status = ApiState.fulfilled;
        state.error = undefined;
      },
    );
    builder.addCase(fetchHazardCategories.rejected, (state, action: any) => {
      state.status = ApiState.rejected;
      state.error = action.error;
    });

    // fetch hazard types
    builder.addCase(fetchHazardTypes.pending, state => {
      state.hazardFeatures = [];
      state.service = 'fetchHazardTypes';
      state.status = ApiState.pending;
      state.error = undefined;
    });
    builder.addCase(
      fetchHazardTypes.fulfilled,
      (state, action: PayloadAction<HazardType[]>) => {
        state.hazardTypes = action.payload;
        state.status = ApiState.fulfilled;
        state.error = undefined;
      },
    );
    builder.addCase(fetchHazardTypes.rejected, (state, action: any) => {
      state.status = ApiState.rejected;
      state.error = action.error;
    });

    // update hazard Feature

    builder.addCase(updateHazardFeature.pending, state => {
      state.service = 'updateHazardFeature';
      state.status = ApiState.pending;
      state.error = undefined;
    });
    builder.addCase(updateHazardFeature.fulfilled, state => {
      state.status = ApiState.fulfilled;
      state.error = undefined;
    });
    builder.addCase(updateHazardFeature.rejected, (state, action: any) => {
      state.status = ApiState.rejected;
      state.error = action.error;
    });
  },
});

export const { setHazardFeatures } = hazardSlice.actions;

export const hazardSelector = (state: RootState) =>
  state?.hazard ?? initialState;
