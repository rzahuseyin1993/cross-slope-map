import { CrossSlopeState } from './crossSlope/CrossSlopeState';
import { HazardState } from './hazard/HazardState';

export type RootState = {
  crossSlope: CrossSlopeState;
  hazard: HazardState;
};
