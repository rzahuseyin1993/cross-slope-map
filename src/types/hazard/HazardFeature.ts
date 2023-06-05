export type HazardFeature = {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    id: number;
    surveyor?: string;
    route?: string;
    categoryId: number;
    category: string;
    hazardTypeId: number;
    hazardType: string;
    comment: string;
    gpsTime: string;
    photoUrl: string;
    pdfUrl: string | null;
  };
};
