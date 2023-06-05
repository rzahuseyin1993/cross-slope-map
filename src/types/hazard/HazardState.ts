import { ApiState } from 'types/apiState';
import { Error } from 'types/Error';
import { HazardFeature } from './HazardFeature';

export type HazardState = {
  hazardFeatures: HazardFeature[];
  selectHazardFeature: HazardFeature | null;
  isLoading: boolean;
  service: string | undefined;
  status: ApiState;
  error?: Error;
};
