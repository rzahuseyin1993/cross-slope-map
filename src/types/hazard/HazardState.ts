import { ApiState } from 'types/apiState';
import { Error } from 'types/Error';
import { HazardCategory } from './HazardCategories';
import { HazardFeature } from './HazardFeature';
import { HazardType } from './HazardType';

export type HazardState = {
  hazardFeatures: HazardFeature[];
  hazardCategories: HazardCategory[];
  hazardTypes: HazardType[];
  isLoading: boolean;
  service: string | undefined;
  status: ApiState;
  error?: Error;
};
