import { ApiState } from 'types/apiState';
import { Error } from 'types/Error';
import { CrossSlopeFeature } from './CrossSlopeFeature';

export type CrossSlopeState = {
  crossSlopeFeatures: CrossSlopeFeature[];
  isLoading: boolean;
  service: string | undefined;
  status: ApiState;
  error?: Error;
};
