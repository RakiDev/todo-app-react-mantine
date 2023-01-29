import { Accordion, Button, Center, List, Paper, Space, Textarea } from "@mantine/core";
import { BackgroundImage } from "@mantine/core";
import { FC } from "react";
import { BsTrash } from "react-icons/bs";

interface MainContentPreviewInterface {
    fileURL: string
    color: string
}

const MainContentPreview: FC<MainContentPreviewInterface> = ({ fileURL, color }) => {

    return (
<Accordion defaultValue="customization">
    <Accordion.Item value="customization">
    <Accordion.Control>Background preview</Accordion.Control>
    <Accordion.Panel>
            <BackgroundImage src={fileURL} radius={10}>
                <div style={{ backgroundColor: color, borderRadius: '10px'}}>
                    <Space h="md" />
                    <Paper shadow="xs" style={{ padding: '5%', margin: '5%', marginTop: '2%' }}>

                        <Textarea
                            placeholder="New task"
                            label="Task"
                            minRows={1}
                            autosize
                            spellCheck={false}
                        />
                        <Space h="md" />
                        <Center>
                            <Button
                                style={{ width: "90%" }}
                            >
                                Add task
                            </Button>
                        </Center>
                    </Paper>
                    <List>
                        <Paper
                            style={{ padding: '5%', margin: '5%' }}
                        >
                            <Textarea
                                defaultValue='Default value'
                                size='md'
                                minRows={1}
                                autosize
                                spellCheck={false}
                            />
                            <Center style={{ marginTop: '5%' }}>
                                <Button
                                    style={{ width: '90%', margin: '1%' }}
                                >
                                    <BsTrash />
                                </Button>
                            </Center>

                        </Paper>
                    </List>
                    <Space h="md" />
                </div>
            </BackgroundImage>
    </Accordion.Panel>
    </Accordion.Item>
</Accordion>
);
}

export default MainContentPreview;


