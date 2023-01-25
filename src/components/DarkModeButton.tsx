import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FC } from 'react';
import { TbSun, TbMoon } from 'react-icons/tb';

const DarkModeButton: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <TbSun size={18} /> : <TbMoon size={18} />}
    </ActionIcon>
  );
}

export default DarkModeButton;