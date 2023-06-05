import { Blank } from 'grommet-icons';

type IconProps = {
  path: string; // input path from material design icons
  size?: string;
  color?: string;
};

const Icon = (props: IconProps) => {
  const { path, size, color } = props;
  return (
    <Blank size={size ?? 'medium'} color={color ?? 'dark-3'}>
      <path d={path} stroke="none"></path>
    </Blank>
  );
};

export default Icon;
