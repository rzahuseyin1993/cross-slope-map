import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Image as GrommetImage, Spinner, Anchor } from 'grommet';
import { Popup } from 'react-map-gl';

import { BASE_URL } from 'consts';
import { ApiState } from 'types/apiState';
import { hazardSelector, updateHazardFeature } from 'store/hazard/slice';
import noImage from 'assets/images/no_image.jpg';

import { HoverInfo } from './types';

type HazardPopupProps = {
  hoverInfo: HoverInfo;
  setHoverInfo: (newValue: HoverInfo | null) => void;
};
const HazardPopup = (props: HazardPopupProps) => {
  const dispatch = useDispatch<any>();
  const { hoverInfo, setHoverInfo } = props;
  const { service, status } = useSelector(hazardSelector);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const handlePDFOpen = () => {
    window.open(`${BASE_URL}${hoverInfo.pdfUrl}`, '_blank');
  };

  const handleSaveChanges = () => {
    if (hoverInfo) {
      const updateValues = {
        Id: hoverInfo.id,
        Longitude: hoverInfo.longitude,
        Latitude: hoverInfo.latitude,
        Comment: hoverInfo.comment,
        'Category.Id': hoverInfo.categoryId,
        'HazardType.Id': hoverInfo.hazardTypeId,
      };
      dispatch(updateHazardFeature(updateValues));
    }
  };

  useEffect(() => {
    if (hoverInfo.photoUrl && hoverInfo.photoUrl !== '') {
      const newImage = new Image();
      newImage.crossOrigin = 'Anonymous';
      newImage.src = `${BASE_URL}${hoverInfo.photoUrl}`;
      newImage.onload = function () {
        setIsImageLoading(false);
      };
      newImage.onerror = function () {
        setIsImageLoading(false);
      };
    } else {
      setIsImageLoading(false);
    }
  }, []);

  return (
    <Popup
      longitude={hoverInfo.longitude}
      latitude={hoverInfo.latitude}
      offset={45}
      // closeOnClick={true}
      closeButton={false}
      maxWidth="90%"
    >
      <Box pad="xsmall" width="220px" gap="xsmall">
        <Box width="100%" style={{ position: 'relative' }}>
          {!isImageLoading && (
            <Box
              pad="xsmall"
              align="center"
              background={{ color: 'black', opacity: 0.2 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            >
              <Text color="white">{`${hoverInfo.category}.${hoverInfo.hazardType}`}</Text>
            </Box>
          )}
          <Box height="280px" justify="center" align="center">
            {isImageLoading ? (
              <Spinner color="brand" />
            ) : hoverInfo.photoUrl && hoverInfo.photoUrl !== '' ? (
              <GrommetImage
                fit="cover"
                src={`${BASE_URL}${hoverInfo.photoUrl}`}
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
          {!isImageLoading && hoverInfo.comment && (
            <Box
              pad={{ vertical: 'xxsmall', horizontal: 'xsmall' }}
              background={{ color: 'black', opacity: 0.2 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            >
              <Text size="small" color="white">
                {hoverInfo.comment}
              </Text>
            </Box>
          )}
        </Box>
        <Box direction="row" align="center" justify="around">
          {hoverInfo.pdfUrl && <Anchor label="View" onClick={handlePDFOpen} />}

          <Box direction="row" align="center" gap="xsmall">
            {service === 'updateHazardFeature' &&
              status === ApiState.pending && <Spinner />}

            <Anchor label="Save Changes" onClick={handleSaveChanges} />
          </Box>
          <Anchor label="Close" onClick={() => setHoverInfo(null)} />
        </Box>
      </Box>
    </Popup>
  );
};

export default HazardPopup;
