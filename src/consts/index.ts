import markerGreenIcon from 'assets/icons/markers/green.png';
import markerOrangeIcon from 'assets/icons/markers/orange.png';
import markerYellowIcon from 'assets/icons/markers/yellow.png';
import markerGreyIcon from 'assets/icons/markers/grey.png';
import markerBlueIcon from 'assets/icons/markers/blue.png';
import markerPurpleIcon from 'assets/icons/markers/purple.png';

import circleGreenIcon from 'assets/icons/circles/green.png';
import circleOrangeIcon from 'assets/icons/circles/orange.png';
import circleRedIcon from 'assets/icons/circles/red.png';

// export const BASE_URL = 'https://accessologydemo.cartigraph.com';
export const BASE_URL = 'http://demo.pathfinderada.com';

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoid3d3bWFzdGVyMSIsImEiOiJjazZmbmxhYngwYjQxM2xtdDdwMjJzYjdnIn0._QtAdUTg9NtC9_R8Caq6Ng';

export const mapIcons = [
  { id: 'marker-green-icon', url: markerGreenIcon, category: 'Level Changes' },
  { id: 'marker-yellow-icon', url: markerYellowIcon, category: 'Obstructions' },
  {
    id: 'marker-orange-icon',
    url: markerOrangeIcon,
    category: 'Surface Material',
  },
  { id: 'marker-grey-icon', url: markerGreyIcon, category: 'Distress' },
  { id: 'marker-blue-icon', url: markerBlueIcon, category: 'Curb Ramps' },
  { id: 'marker-purple-icon', url: markerPurpleIcon, category: 'Drive way' },
  {
    id: 'circle-green-icon',
    url: circleGreenIcon,
    category: 'Cross(%) 0 to 2.5',
  },
  {
    id: 'circle-orange-icon',
    url: circleOrangeIcon,
    category: 'Cross(%) 2.6 to 5',
  },
  { id: 'circle-red-icon', url: circleRedIcon, category: 'Cross(%) 5.1+' },
];
