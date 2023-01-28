import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Container,
  Space,
  BackgroundImage
} from '@mantine/core';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes
} from 'react-router-dom'
import MainContent from './components/MainContent';
import DarkModeButton from './components/DarkModeButton';
import NavRoutes from './components/NavRoutes';
import Settings from './components/Settings';
import { usePersistentState } from './customHooks/usePersistentState';

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
        <Header style={{ textAlign: 'center' }} height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                />
            </MediaQuery>
            <Container>
              <Text style={{ fontWeight: 'bold' }}>TODO Simple</Text>
            </Container>
            <Space h="md" />
            <DarkModeButton />
          </div>
        </Header>
      }
    >
      <Routes>
        <Route path='/' element={
          <BackgroundImage src={fileURL === null ? '' : fileURL} style={{ backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
            <div style={{width: '100%'}}>
              <MainContent />
            </div>
          </BackgroundImage>
        }/>
        <Route path='/settings' element={<Settings setFileURL={setFileURL} fileURL={fileURL} />}/>
        <Route path='/info'/>
      </Routes>
    </AppShell>
    </Router>
  );
}

export default App;