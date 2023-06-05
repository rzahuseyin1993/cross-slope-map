import { useContext } from 'react';
import { Box, Text, Image, ResponsiveContext } from 'grommet';

import { mdiCircle } from '@mdi/js';

import Icon from 'components/Icon';
import { mapIcons } from 'consts';

const Legend = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      responsive={false}
      pad="small"
      round="xxsmall"
      gap="small"
      background={{ color: 'light-1', opacity: 0.9 }}
      style={{ position: 'absolute', left: 10, bottom: 10, zIndex: 9 }}
    >
      <Box
        pad={{ left: '10px' }}
        direction={size === 'small' ? 'column' : 'row'}
        gap="small"
      >
        <Box direction="row" align="center" gap="small">
          <Icon path={mdiCircle} color="green" size="small" />
          <Text size="small">Cross(%) 0 to 2.5</Text>
        </Box>
        <Box direction="row" align="center" gap="small">
          <Icon path={mdiCircle} color="orange" size="small" />
          <Text size="small">Cross(%) 2.6 to 5</Text>
        </Box>
        <Box direction="row" align="center" gap="small">
          <Icon path={mdiCircle} color="red" size="small" />
          <Text size="small">Cross(%) 5.1+</Text>
        </Box>
      </Box>
      <Box direction={size === 'small' ? 'column' : 'row'} gap="xsmall">
        {mapIcons.map((item, index) => (
          <Box
            key={`icon-${index}`}
            direction="row"
            align="center"
            // gap="xxsmall"
          >
            <Image src={item.url} width="32px" height="32px" />
            <Text size="small">{item.category}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Legend;
