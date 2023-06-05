export type CrossSlopeFeature = {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    id: string;
    cross: number;
    surveyor?: string;
    route?: string;
    gpsTime?: string;
  };
};
