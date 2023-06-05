import { http } from 'utils/api';

export const fetchCrossSlopeDataApi = () => http.get(`/CrossSlope`);
