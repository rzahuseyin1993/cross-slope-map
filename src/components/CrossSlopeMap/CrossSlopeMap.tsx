import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Spinner } from 'grommet';

import ReactMapGL, {
  Source,
  Layer,
  MapRef,
  NavigationControl,
  MapLayerMouseEvent,
  MapboxGeoJSONFeature,
} from 'react-map-gl';
import * as turf from '@turf/turf';
// import { Feature, Point } from 'geojson';
// import { mdiMapMarkerPlus } from '@mdi/js';

// import Icon from 'components/Icon';
import { MAPBOX_ACCESS_TOKEN } from 'consts';
// import { HazardFeature } from 'types/hazard/HazardFeature';
// import { CrossSlopeFeature } from 'types/crossSlope/CrossSlopeFeature';
import {
  crossSlopeSelector,
  fetchCrossSlopeFeatures,
  // setCrossSlopeFeatures,
} from 'store/crossSlope/slice';
import {
  fetchHazardFeatures,
  hazardSelector,
  // setHazardFeatures,
} from 'store/hazard/slice';
import { mapIcons } from 'consts';
import Legend from './Legend';
import Popup from './Popup';
// import EditDialog from './EditDialog';

const CrossSlopeMap = () => {
  const dispatch = useDispatch<any>();
  const { crossSlopeFeatures, isLoading } = useSelector(crossSlopeSelector);
  const { hazardFeatures } = useSelector(hazardSelector);
  const [isLegendVisible, setIsLegendVisible] = useState<boolean>(false);

  const mapRef = useRef<MapRef>(null);
  const [mapCursor, setMapCursor] = useState<string>('');

  // const [isMouseDownClicked, setIsMouseDownClicked] = useState<boolean>(false);
  const [selectFeature, setSelectFeature] =
    useState<MapboxGeoJSONFeature | null>(null);
  // const [createToggle, setCreateToggle] = useState<boolean>(false);
  // const [createHazardFeature, setCreateHazardFeature] =
  //   useState<Feature<Point> | null>(null);

  // const handleEditDialogClose = () => {
  //   setCreateToggle(false);
  //   setCreateHazardFeature(null);
  // };

  // const handleMapMouseDown = (event: MapLayerMouseEvent) => {
  //   // if (createToggle) return;
  //   const feature = findFeature(event);
  //   if (
  //     feature &&
  //     selectFeature &&
  //     feature.properties?.id === selectFeature.properties?.id
  //   ) {
  //     setIsMouseDownClicked(true);
  //     if (feature.layer.id.includes('hazard-marker-')) {
  //       const newHazardFeatures = hazardFeatures.filter(
  //         item => item.properties.id !== selectFeature.properties?.id,
  //       );
  //       dispatch(setHazardFeatures(newHazardFeatures));
  //     } else if (feature.layer.id.includes('cross-slope-symbol-')) {
  //       const newCrossSlopeFeatures = crossSlopeFeatures.filter(
  //         item => item.properties.id !== selectFeature.properties?.id,
  //       );
  //       dispatch(setCrossSlopeFeatures(newCrossSlopeFeatures));
  //     }
  //     setSelectFeature(feature);
  //   }
  // };

  // const handleMapMouseUp = () => {
  //   // if (createToggle) return;
  //   setIsMouseDownClicked(false);
  //   if (selectFeature) {
  //     if (selectFeature.layer.id.includes('hazard-marker-')) {
  //       dispatch(
  //         setHazardFeatures([
  //           ...hazardFeatures,
  //           {
  //             type: 'Feature',
  //             geometry: selectFeature.geometry,
  //             properties: selectFeature.properties,
  //           } as HazardFeature,
  //         ]),
  //       );
  //     } else if (selectFeature.layer.id.includes('cross-slope-symbol-')) {
  //       dispatch(
  //         setCrossSlopeFeatures([
  //           ...crossSlopeFeatures,
  //           {
  //             type: 'Feature',
  //             geometry: selectFeature.geometry,
  //             properties: selectFeature.properties,
  //           } as CrossSlopeFeature,
  //         ]),
  //       );
  //     }
  //     // setSelectFeature(null);
  //   }
  // };

  const handleMapMouseMove = (event: MapLayerMouseEvent) => {
    // if (createToggle) {
    //   setMapCursor('crosshair');
    // } else {
    // if (isMouseDownClicked && selectFeature) {
    //   const mousePoint: [number, number] = [event.lngLat.lng, event.lngLat.lat];
    //   const newSelectFeature = {
    //     ...selectFeature,
    //     geometry: {
    //       ...selectFeature.geometry,
    //       coordinates: mousePoint,
    //     },
    //   } as MapboxGeoJSONFeature;
    //   setSelectFeature(newSelectFeature);
    // } else {
    const feature = findFeature(event);
    if (feature) {
      setMapCursor('pointer');
    } else {
      setMapCursor('');
    }
    // }
    // }
  };

  const handleMapClick = (event: MapLayerMouseEvent) => {
    // if (createToggle) {
    // event.lngLat
    // setCreateHazardFeature({
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [event.lngLat.lng, event.lngLat.lat],
    //   },
    //   properties: {
    //     category: 'Drive way',
    //   },
    // });
    // } else {
    const feature = findFeature(event);
    if (feature) {
      setSelectFeature(null);
      setTimeout(() => {
        setSelectFeature(feature);
      }, 300);
    }
    // }
  };

  const findFeature = (event: MapLayerMouseEvent) => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap();
      const allLayers = map.getStyle().layers;
      if (allLayers) {
        const interactiveLayerIds = allLayers
          .filter(
            item =>
              item.id.includes('cross-slope-symbol-') ||
              item.id.includes('hazard-marker-'),
          )
          .map(item => item.id);
        const findFeatures = map.queryRenderedFeatures(event.point, {
          layers: interactiveLayerIds,
        });
        if (findFeatures && findFeatures.length > 0) {
          const feature = findFeatures[0];
          return feature;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (!isLoading && crossSlopeFeatures.length > 0 && mapRef.current) {
      const map = mapRef.current?.getMap();
      let bbox: any = turf.bbox({
        type: 'FeatureCollection',
        features: crossSlopeFeatures,
      });
      map.fitBounds(bbox, { padding: 20 });
      setTimeout(() => {
        setIsLegendVisible(true);
      }, 5000);
    }
  }, [isLoading]);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap();
      mapIcons.forEach(icon => {
        map.loadImage(icon.url, function (error, res: any) {
          if (error) throw error;
          if (!map.hasImage(icon.id)) {
            map.addImage(icon.id, res);
          }
        });
      });
    }
  }, [mapRef.current]);

  useEffect(() => {
    dispatch(fetchCrossSlopeFeatures());
    dispatch(fetchHazardFeatures());
  }, []);

  return (
    <Box width="100%" height="100%" style={{ position: 'relative' }}>
      {isLoading && (
        <Box
          width="100%"
          height="100%"
          justify="center"
          align="center"
          gap="small"
          background={{ color: 'rgb(0,0,0)', opacity: 0.5 }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 9,
          }}
        >
          <Spinner color="brand" />
          <Text>Loading...</Text>
        </Box>
      )}
      <Box width="100%" height="100%">
        <ReactMapGL
          ref={mapRef}
          initialViewState={{
            longitude: -122.521003,
            latitude: 47.6357855,
            zoom: 8,
          }}
          style={{ width: '100%', height: '100%' }}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          // projection="globe"
          maxZoom={20}
          attributionControl={false}
          cursor={mapCursor}
          // dragPan={!isMouseDownClicked}
          onMouseMove={handleMapMouseMove}
          // onMouseDown={handleMapMouseDown}
          // onMouseUp={handleMapMouseUp}
          onClick={handleMapClick}
        >
          <Source
            id="gap-source"
            type="geojson"
            data={{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [0, 0] },
              properties: {},
            }}
          >
            <Layer
              id="gap-layer-1"
              source="gap-source"
              type="circle"
              paint={{ 'circle-radius': 0, 'circle-opacity': 0 }}
            />
            <Layer
              id="gap-layer-2"
              source="gap-source"
              type="circle"
              paint={{ 'circle-radius': 0, 'circle-opacity': 0 }}
            />
          </Source>
          <Source
            id="cross-slope"
            type="geojson"
            data={{ type: 'FeatureCollection', features: crossSlopeFeatures }}
          >
            <Layer
              id="cross-slope-circle-green-layer"
              source="cross-slope"
              filter={[
                'all',
                ['>=', ['abs', ['get', 'cross']], 0],
                ['<=', ['abs', ['get', 'cross']], 2.5],
              ]}
              type="circle"
              paint={{
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  12,
                  0.4,
                  20,
                  6,
                ],
                'circle-color': 'green',
              }}
              minzoom={12}
              maxzoom={19}
              beforeId="gap-layer-1"
            />
            <Layer
              id="cross-slope-symbol-green-layer"
              source="cross-slope"
              filter={[
                'all',
                ['>=', ['abs', ['get', 'cross']], 0],
                ['<=', ['abs', ['get', 'cross']], 2.5],
              ]}
              type="symbol"
              layout={{
                'icon-image': 'circle-green-icon',
                'icon-size': 0.8,
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
              }}
              minzoom={19}
              beforeId="gap-layer-1"
            />
            <Layer
              id="cross-slope-circle-orange-layer"
              source="cross-slope"
              filter={[
                'all',
                ['>', ['abs', ['get', 'cross']], 2.5],
                ['<=', ['abs', ['get', 'cross']], 5],
              ]}
              type="circle"
              paint={{
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  12,
                  0.4,
                  20,
                  6,
                ],
                'circle-color': 'orange',
              }}
              minzoom={12}
              maxzoom={19}
              beforeId="gap-layer-1"
            />
            <Layer
              id="cross-slope-symbol-orange-layer"
              source="cross-slope"
              filter={[
                'all',
                ['>', ['abs', ['get', 'cross']], 2.5],
                ['<=', ['abs', ['get', 'cross']], 5],
              ]}
              type="symbol"
              layout={{
                'icon-image': 'circle-orange-icon',
                'icon-size': 0.8,
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
              }}
              minzoom={19}
              beforeId="gap-layer-1"
            />
            <Layer
              id="cross-slope-circle-red-layer"
              source="cross-slope"
              filter={['>', ['abs', ['get', 'cross']], 5]}
              type="circle"
              paint={{
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  12,
                  0.4,
                  20,
                  6,
                ],
                'circle-color': 'red',
              }}
              minzoom={12}
              maxzoom={19}
              beforeId="gap-layer-1"
            />
            <Layer
              id="cross-slope-symbol-red-layer"
              source="cross-slope"
              filter={['>', ['abs', ['get', 'cross']], 5]}
              type="symbol"
              layout={{
                'icon-image': 'circle-red-icon',
                'icon-size': 0.8,
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
              }}
              minzoom={19}
              beforeId="gap-layer-1"
            />
          </Source>
          <Source
            id="hazard"
            type="geojson"
            data={{ type: 'FeatureCollection', features: hazardFeatures }}
          >
            {mapIcons
              .filter(item => item.id.includes('marker-'))
              .map(item => (
                <Layer
                  key={`hazard-${item.id}-layer`}
                  id={`hazard-${item.id}-layer`}
                  source="hazard"
                  filter={['==', 'category', item.category]}
                  type="symbol"
                  layout={{
                    'icon-image': item.id,
                    'icon-size': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      12,
                      0.4,
                      20,
                      1,
                    ],
                    'icon-anchor': 'bottom',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true,
                  }}
                  minzoom={12}
                  beforeId="gap-layer-2"
                />
              ))}
          </Source>
          {selectFeature && (
            <Source
              id="select-source"
              type="geojson"
              data={{
                type: 'Feature',
                geometry: selectFeature.geometry,
                properties: selectFeature.properties,
              }}
            >
              {selectFeature.layer.id.includes('hazard-marker-') && (
                <>
                  <Layer
                    key={`hazard-select-layer`}
                    id={`hazard-select-layer`}
                    source="select-source"
                    type="symbol"
                    layout={{
                      'icon-image': mapIcons.find(
                        item =>
                          item.category === selectFeature.properties?.category,
                      )?.id,
                      'icon-size': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        12,
                        0.4,
                        20,
                        1,
                      ],
                      'icon-anchor': 'bottom',
                      'icon-allow-overlap': true,
                      'icon-ignore-placement': true,
                    }}
                    minzoom={12}
                    beforeId="gap-layer-2"
                  />
                  <Layer
                    id="select-anchor-layer"
                    source="select-source"
                    type="circle"
                    paint={{
                      'circle-radius': 2,
                      'circle-color': 'cyan',
                    }}
                    minzoom={12}
                    beforeId="gap-layer-2"
                  />
                </>
              )}
              {selectFeature.layer.id.includes('cross-slope-symbol-') && (
                <Layer
                  id="select-anchor-layer"
                  source="select-source"
                  type="circle"
                  paint={{
                    'circle-radius': 6,
                    'circle-color': 'cyan',
                  }}
                  minzoom={12}
                  beforeId="gap-layer-2"
                />
              )}
            </Source>
          )}
          {/* {createHazardFeature && (
            <Source
              id="create-hazard-source"
              type="geojson"
              data={createHazardFeature}
            >
              <Layer
                id={`hazard-create-layer`}
                source="select-source"
                type="symbol"
                layout={{
                  'icon-image': mapIcons.find(
                    item =>
                      item.category ===
                      createHazardFeature.properties?.category,
                  )?.id,
                  'icon-size': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12,
                    0.4,
                    20,
                    1,
                  ],
                  'icon-anchor': 'bottom',
                  'icon-allow-overlap': true,
                  'icon-ignore-placement': true,
                }}
                // minzoom={12}
                beforeId="gap-layer-2"
              />
            </Source>
          )} */}
          <NavigationControl position="top-right" />
          {selectFeature && (
            <Popup
              selectFeature={selectFeature}
              setSelectFeature={setSelectFeature}
            />
          )}
        </ReactMapGL>
      </Box>
      {/* {isLegendVisible && (
        <Box
          pad="xsmall"
          round="xsmall"
          elevation="small"
          background={createToggle ? 'accent-4' : 'light-1'}
          style={{ position: 'absolute', right: 10, top: 120, zIndex: 9 }}
          onClick={() => setCreateToggle(!createToggle)}
        >
          <Icon path={mdiMapMarkerPlus} color="purple" />
        </Box>
      )} */}
      {isLegendVisible && <Legend />}
      {/* {createHazardFeature && (
        <EditDialog
          coords={createHazardFeature.geometry.coordinates as [number, number]}
          onClose={handleEditDialogClose}
        />
      )} */}
    </Box>
  );
};

export default CrossSlopeMap;
