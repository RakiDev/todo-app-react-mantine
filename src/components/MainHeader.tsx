import { Burger, Container, Header, MediaQuery, Space, Text } from "@mantine/core";
import { FC } from "react";
import DarkModeButton from "./DarkModeButton";

interface MainHeaderInterface {
    opened: boolean
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const MainHeader: FC<MainHeaderInterface> = ({ opened, setOpened }) => {

    return (
        <Header style={{ textAlign: 'center' }} height={{ base: 50, md: 70 }} p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              mr="xl"
              styles={(theme) => ({
                root: {
                    color: theme.colors.gray[6]
                }
              })}
              />
          </MediaQuery>
          <Container>
            <Text style={{ fontWeight: 'bold' }}>TODO Simple</Text>
          </Container>
          <Space h="md" />
          <DarkModeButton />
        </div>
      </Header>
    );
}

export default MainHeader;