import { Button, Divider, Paper, Text, Flex } from "@mantine/core";
import { FC } from "react";
import { FaDiscord } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';


const Info: FC = () => {
    return (
        <>
        <Paper withBorder style={{ borderRadius: '4px' }}>
            <Text ta='center' weight='bolder' variant="gradient">
                This app was made with ❤ by RakiDev
            </Text>
        </Paper>
        <Divider my="md" label="Contact" labelPosition="center"  style={{ fontWeight: 'bolder'}}/>
        <Flex align='center' justify='center'>
            <Button leftIcon={<AiFillGithub/>} style={{ backgroundColor: '#0d1117', width: '40%' }}>
                Github
            </Button>
            <Button leftIcon={<FaDiscord />} style={{ backgroundColor: '#5764f2', width: '40%' }}>
                Discord
            </Button>
        </Flex>
        </>
    );
}

export default Info;