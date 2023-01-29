import { useState } from 'react';
import {
  AppShell,
  Navbar,
  useMantineTheme,
  Container,
  Space,
  BackgroundImage
} from '@mantine/core';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import MainContent from './components/MainContent';
import NavRoutes from './components/NavRoutes';
import Settings from './components/Settings';
import { usePersistentState } from './customHooks/usePersistentState';
import MainHeader from './components/MainHeader';
import Info from './components/Info';

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [fileURL, setFileURL] = usePersistentState<string | null>("backgroundImage");

  return (
    <Router>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <NavRoutes/>
        </Navbar>
      }
      header={
        <MainHeader
          opened={opened}
          setOpened={setOpened}
        />
      }
    >
      <Routes>
        <Route path='/' element={<MainContent />}/>
        <Route path='/settings' element={<Settings setFileURL={setFileURL} fileURL={fileURL} />}/>
        <Route path='/info' element={<Info />}/>
      </Routes>
    </AppShell>
    </Router>
  );
}

export default App;