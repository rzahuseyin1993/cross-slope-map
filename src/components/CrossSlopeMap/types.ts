export type HoverInfo = {
  id: number;
  longitude: number;
  latitude: number;
  categoryId: number;
  category: string;
  hazardTypeId: number;
  hazardType: string;
  comment: string;
  photoUrl: string;
  pdfUrl: string | null;
};
