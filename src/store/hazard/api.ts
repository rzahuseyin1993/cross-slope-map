import { http } from 'utils/api';

export const fetchHazardDataApi = () => http.get(`/Hazard/Get`);

export const createHazardDataApi = (payload?: any) => {
  let formdata = new FormData();
  for (let key in payload) {
    formdata.append(key, String(payload[key]));
  }
  return http.post(`/Hazard`, formdata);
};

export const updateHazardDataApi = (payload?: any) => {
  let formdata = new FormData();
  for (let key in payload) {
    formdata.append(key, String(payload[key]));
  }
  return http.put(`/Hazard`, formdata);
};

export const fetchHazardTypesApi = () => http.get(`/HazardType`);

export const fetchHazardCategoriesApi = () => http.get(`/Category`);
