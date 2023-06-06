import { useContext } from 'react';
import { Box, Text, Image, ResponsiveContext } from 'grommet';

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
        {mapIcons
          .filter(item => item.id.includes('circle-'))
          .map((item, index) => (
            <Box
              key={`circle-${index}`}
              direction="row"
              align="center"
              gap="xsmall"
            >
              <Image src={item.url} width="16px" height="16px" />
              <Text size="small">{item.category}</Text>
            </Box>
          ))}
      </Box>
      <Box direction={size === 'small' ? 'column' : 'row'} gap="xsmall">
        {mapIcons
          .filter(item => item.id.includes('marker-'))
          .map((item, index) => (
            <Box
              key={`marker-${index}`}
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
