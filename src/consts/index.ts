import greenIcon from 'assets/icons/green.png';
import orangeIcon from 'assets/icons/orange.png';
import yellowIcon from 'assets/icons/yellow.png';
import greyIcon from 'assets/icons/grey.png';
import blueIcon from 'assets/icons/blue.png';

export const BASE_URL = 'https://accessologydemo.cartigraph.com';

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoid3d3bWFzdGVyMSIsImEiOiJjazZmbmxhYngwYjQxM2xtdDdwMjJzYjdnIn0._QtAdUTg9NtC9_R8Caq6Ng';

export const mapIcons = [
  { id: 'green-icon', url: greenIcon, category: 'Level Changes' },
  { id: 'yellow-icon', url: yellowIcon, category: 'Obstructions' },
  { id: 'orange-icon', url: orangeIcon, category: 'Surface Material' },
  { id: 'grey-icon', url: greyIcon, category: 'Distress' },
  { id: 'blue-icon', url: blueIcon, category: 'Curb Ramps' },
];
