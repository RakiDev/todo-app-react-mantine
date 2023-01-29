import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FC } from 'react';
import { TbSun, TbMoon } from 'react-icons/tb';
import { showNotification } from '@mantine/notifications';

const notifications = {
  colorSchemeToggled: {
    title: 'Theme switched!',
    message: 'The theme has been switched, press again to switch back'
  }
}

const DarkModeButton: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => {toggleColorScheme(); showNotification(notifications.colorSchemeToggled)}}
      title="Toggle color scheme"
    >
      {dark ? <TbSun size={18} /> : <TbMoon size={18} />}
    </ActionIcon>
  );
}

export default DarkModeButton;