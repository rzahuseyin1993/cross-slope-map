import { http } from 'utils/api';

export const fetchCrossSlopeDataApi = () => http.get(`/CrossSlope/GetRosero`);

export const updateCrossSlopeDataApi = (payload?: any) => {
  let formdata = new FormData();
  for (let key in payload) {
    formdata.append(key, String(payload[key]));
  }
  return http.put(`/CrossSlope`, formdata);
};
