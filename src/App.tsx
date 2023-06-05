import { Grommet } from 'grommet';

import CrossSlopeMap from 'components/CrossSlopeMap';

import theme from './theme';

const App = () => {
  return (
    <Grommet
      theme={theme}
      id="cross-slop-map"
      style={{ width: '100%', height: '100%' }}
    >
      <CrossSlopeMap />
    </Grommet>
  );
};

export default App;
