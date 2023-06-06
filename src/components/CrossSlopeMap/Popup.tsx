import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Image as GrommetImage, Spinner, Anchor } from 'grommet';
import { MapboxGeoJSONFeature, Popup as MapboxPopup } from 'react-map-gl';

import { BASE_URL } from 'consts';
import { ApiState } from 'types/apiState';
import {
  crossSlopeSelector,
  updateCrossSlopeFeature,
} from 'store/crossSlope/slice';
import { hazardSelector, updateHazardFeature } from 'store/hazard/slice';
import noImage from 'assets/images/no_image.jpg';

type PopupProps = {
  selectFeature: MapboxGeoJSONFeature;
  setSelectFeature: (newValue: MapboxGeoJSONFeature | null) => void;
};
const Popup = (props: PopupProps) => {
  const dispatch = useDispatch<any>();
  const { selectFeature, setSelectFeature } = props;
  const { service, status } = useSelector(hazardSelector);
  const crossSlopeStates = useSelector(crossSlopeSelector);

  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const handlePDFOpen = () => {
    window.open(`${BASE_URL}${selectFeature.properties?.pdfUrl}`, '_blank');
  };

  const handleSaveChanges = () => {
    if (selectFeature && selectFeature.layer.id.includes('hazard-')) {
      const coords = (selectFeature.geometry as any).coordinates;
      const props: any = selectFeature.properties;
      const updateValues = {
        Id: props.id,
        Longitude: coords[0],
        Latitude: coords[1],
        Comment: props.comment,
        'Category.Id': props.categoryId,
        'HazardType.Id': props.hazardTypeId,
      };
      dispatch(updateHazardFeature(updateValues));
    } else if (
      selectFeature &&
      selectFeature.layer.id.includes('cross-slope-')
    ) {
      const coords = (selectFeature.geometry as any).coordinates;
      const props: any = selectFeature.properties;
      const updateValues = {
        Id: props.id,
        Longitude: coords[0],
        Latitude: coords[1],
        Cross: props.cross,
      };
      dispatch(updateCrossSlopeFeature(updateValues));
    }
  };

  useEffect(() => {
    if (selectFeature && selectFeature.layer.id.includes('hazard-')) {
      const props: any = selectFeature.properties;
      if (props.photoUrl && props.photoUrl !== '') {
        const newImage = new Image();
        newImage.crossOrigin = 'Anonymous';
        newImage.src = `${BASE_URL}${props.photoUrl}`;
        newImage.onload = function () {
          setIsImageLoading(false);
        };
        newImage.onerror = function () {
          setIsImageLoading(false);
        };
      } else {
        setIsImageLoading(false);
      }
    }
  }, []);

  return (
    <MapboxPopup
      longitude={(selectFeature.geometry as any).coordinates[0]}
      latitude={(selectFeature.geometry as any).coordinates[1]}
      offset={selectFeature.layer.id.includes('hazard-') ? 45 : 10}
      closeButton={false}
      onClose={() => setSelectFeature(null)}
      maxWidth="90%"
    >
      {selectFeature.layer.id.includes('cross-slope-') && (
        <Box pad="xsmall" gap="small">
          <Box direction="row" gap="small">
            <Text>ID:</Text>
            <Text>{selectFeature.properties?.id}</Text>
          </Box>
          <Box direction="row" gap="small">
            <Text>Cross(%):</Text>
            <Text>{selectFeature.properties?.cross}</Text>
          </Box>
          <Box direction="row" align="center" gap="small">
            <Box direction="row" align="center" gap="xsmall">
              {crossSlopeStates.service === 'updateCrossSlopeFeature' &&
                crossSlopeStates.status === ApiState.pending && <Spinner />}
              <Anchor label="Save Changes" onClick={handleSaveChanges} />
            </Box>
            <Anchor label="Close" onClick={() => setSelectFeature(null)} />
          </Box>
        </Box>
      )}
      {selectFeature.layer.id.includes('hazard-') && (
        <Box pad="xsmall" width="220px" gap="xsmall">
          <Box width="100%" style={{ position: 'relative' }}>
            {!isImageLoading && (
              <Box
                pad="xsmall"
                align="center"
                background={{ color: 'black', opacity: 0.2 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
              >
                <Text color="white">{`${selectFeature.properties?.category}.${selectFeature.properties?.hazardType}`}</Text>
              </Box>
            )}
            <Box height="280px" justify="center" align="center">
              {isImageLoading ? (
                <Spinner color="brand" />
              ) : selectFeature.properties?.photoUrl &&
                selectFeature.properties?.photoUrl !== '' ? (
                <GrommetImage
                  fit="cover"
                  src={`${BASE_URL}${selectFeature.properties?.photoUrl}`}
                  width="100%"
                  height="100%"
                />
              ) : (
                <GrommetImage
                  fit="cover"
                  src={noImage}
                  width="100%"
                  height="100%"
                />
              )}
            </Box>
            {!isImageLoading && selectFeature.properties?.comment && (
              <Box
                pad={{ vertical: 'xxsmall', horizontal: 'xsmall' }}
                background={{ color: 'black', opacity: 0.2 }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
              >
                <Text size="small" color="white">
                  {selectFeature.properties?.comment}
                </Text>
              </Box>
            )}
          </Box>
          <Box direction="row" align="center" justify="around">
            {selectFeature.properties?.pdfUrl && (
              <Anchor label="View" onClick={handlePDFOpen} />
            )}

            <Box direction="row" align="center" gap="xsmall">
              {service === 'updateHazardFeature' &&
                status === ApiState.pending && <Spinner />}

              <Anchor label="Save Changes" onClick={handleSaveChanges} />
            </Box>
            <Anchor label="Close" onClick={() => setSelectFeature(null)} />
          </Box>
        </Box>
      )}
    </MapboxPopup>
  );
};

export default Popup;
