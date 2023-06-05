import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Spinner } from 'grommet';

import ReactMapGL, {
  Source,
  Layer,
  MapRef,
  NavigationControl,
  MapLayerMouseEvent,
} from 'react-map-gl';
import * as turf from '@turf/turf';

import { MAPBOX_ACCESS_TOKEN } from 'consts';
import { HazardFeature } from 'types/hazard/HazardFeature';
import {
  crossSlopeSelector,
  fetchCrossSlopeFeatures,
} from 'store/crossSlope/slice';
import {
  fetchHazardFeatures,
  hazardSelector,
  setHazardFeatures,
  setSelectHazardFeature,
} from 'store/hazard/slice';
import { mapIcons } from 'consts';
import Legend from './Legend';
import { HoverInfo } from './types';
import HazardPopup from './HazardPopup';

const CrossSlopeMap = () => {
  const dispatch = useDispatch<any>();
  const { crossSlopeFeatures, isLoading } = useSelector(crossSlopeSelector);
  const { hazardFeatures, selectHazardFeature } = useSelector(hazardSelector);
  const [isLegendVisible, setIsLegendVisible] = useState<boolean>(false);

  const mapRef = useRef<MapRef>(null);
  const [mapCursor, setMapCursor] = useState<string>('');
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const [isMouseDownClicked, setIsMouseDownClicked] = useState<boolean>(false);

  const handleMapMouseDown = (event: MapLayerMouseEvent) => {
    const feature = findFeature(event);
    if (
      feature &&
      selectHazardFeature &&
      feature.properties.id === selectHazardFeature.properties.id
    ) {
      setIsMouseDownClicked(true);
      const newHazardFeatures = hazardFeatures.filter(
        item => item.properties.id !== selectHazardFeature.properties.id,
      );
      dispatch(setHazardFeatures(newHazardFeatures));
    }
  };

  const handleMapMouseUp = () => {
    setIsMouseDownClicked(false);
    if (selectHazardFeature) {
      dispatch(setHazardFeatures([...hazardFeatures, selectHazardFeature]));
      dispatch(setSelectHazardFeature(null));
    }
  };

  const handleMapMouseMove = (event: MapLayerMouseEvent) => {
    if (isMouseDownClicked && selectHazardFeature) {
      if (hoverInfo) setHoverInfo(null);
      const mousePoint: [number, number] = [event.lngLat.lng, event.lngLat.lat];
      const newSelectFeature = {
        ...selectHazardFeature,
        geometry: {
          ...selectHazardFeature.geometry,
          coordinates: mousePoint,
        },
      };
      dispatch(setSelectHazardFeature(newSelectFeature));
    } else {
      const feature = findFeature(event);
      if (feature) {
        setMapCursor('pointer');
      } else {
        setMapCursor('');
      }
    }
  };

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const feature = findFeature(event);
    if (feature) {
      setHoverInfo(null);
      setTimeout(() => {
        dispatch(setSelectHazardFeature(feature));
        const coords = (feature.geometry as any).coordinates;
        setHoverInfo({
          ...feature.properties,
          longitude: coords[0],
          latitude: coords[1],
        } as HoverInfo);
      }, 300);
    }
  };

  const findFeature = (event: MapLayerMouseEvent) => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current.getMap();
      const allLayers = map.getStyle().layers;
      if (allLayers) {
        const interactiveLayerIds = allLayers
          .filter(item => item.id.includes('hazard-'))
          .map(item => item.id);
        let findFeatures = map.queryRenderedFeatures(event.point, {
          layers: interactiveLayerIds,
        });
        if (findFeatures && findFeatures.length > 0) {
          const feature = findFeatures[0];
          return {
            type: feature.type,
            geometry: feature.geometry,
            properties: feature.properties,
          } as HazardFeature;
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
            longitude: 0,
            latitude: 0,
            zoom: 1,
          }}
          style={{ width: '100%', height: '100%' }}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          // mapStyle="mapbox://styles/mapbox/streets-v12"
          projection="globe"
          maxZoom={20}
          attributionControl={false}
          cursor={mapCursor}
          dragPan={!isMouseDownClicked}
          onMouseMove={handleMapMouseMove}
          onMouseDown={handleMapMouseDown}
          onMouseUp={handleMapMouseUp}
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
              id="cross-slope-green-layer"
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
                  0.1,
                  19,
                  6,
                ],
                'circle-color': 'green',
              }}
              minzoom={12}
              beforeId="gap-layer-1"
            />
            <Layer
              id="cross-slope-orange-layer"
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
                  0.1,
                  19,
                  6,
                ],
                'circle-color': 'orange',
              }}
              minzoom={12}
              beforeId="gap-layer-1"
            />
            <Layer
              id="cross-slope-red-layer"
              source="cross-slope"
              filter={['>', ['abs', ['get', 'cross']], 5]}
              type="circle"
              paint={{
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  12,
                  0.1,
                  19,
                  6,
                ],
                'circle-color': 'red',
              }}
              minzoom={12}
              beforeId="gap-layer-1"
            />
          </Source>
          <Source
            id="hazard"
            type="geojson"
            data={{ type: 'FeatureCollection', features: hazardFeatures }}
          >
            {mapIcons.map(item => (
              <Layer
                key={`hazard-${item.id}-layer`}
                id={`hazard-${item.id}-layer`}
                source="hazard"
                filter={[
                  'all',
                  ['==', 'category', item.category],
                  // ['!=', 'id', selectHazardFeature?.properties.id ?? ''],
                ]}
                type="symbol"
                layout={{
                  'icon-image': item.id,
                  'icon-size': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12,
                    0.4,
                    19,
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
          {selectHazardFeature && (
            <Source
              id="hazard-select"
              type="geojson"
              data={selectHazardFeature}
            >
              <Layer
                key={`hazard-select-layer`}
                id={`hazard-select-layer`}
                source="hazard-select"
                type="symbol"
                layout={{
                  'icon-image': mapIcons.find(
                    item =>
                      item.category === selectHazardFeature.properties.category,
                  )?.id,
                  'icon-size': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12,
                    0.4,
                    19,
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
                id="hazard-select-anchor-layer"
                source="hazard-select"
                type="circle"
                paint={{
                  'circle-radius': 2,
                  'circle-color': 'cyan',
                }}
                minzoom={12}
                beforeId="gap-layer-2"
              />
            </Source>
          )}
          <NavigationControl position="top-right" />
          {hoverInfo && (
            <HazardPopup hoverInfo={hoverInfo} setHoverInfo={setHoverInfo} />
          )}
        </ReactMapGL>
      </Box>
      {isLegendVisible && <Legend />}
    </Box>
  );
};

export default CrossSlopeMap;
