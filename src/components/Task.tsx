import { Button, Center, Paper, Textarea } from "@mantine/core";
import { FC, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { useDebouncedState } from "@mantine/hooks";

interface TaskInterface {
    id: number
    value: string
    modifyTask: (id: number, mod: string) => void;
    deleteTask: (id: number) => void;
}

const Task: FC<TaskInterface> = ({ id, value, deleteTask, modifyTask }) => {
    const [fieldValue, setFieldValue] = useDebouncedState<string>(value, 200);

    useEffect(() => {
        modifyTask(id, fieldValue);
    }, [fieldValue]);

    return (
        <Paper 
            key={id}
            style={{ padding: '5%', marginBottom: '5%'}}
        >
            <Textarea
                defaultValue={fieldValue}
                onChange={(e) => setFieldValue(e.currentTarget.value)}
                size='md'
                minRows={1}
                autosize
                spellCheck={false}
            />
            <Center style={{ marginTop: '5%'}}>
                <Button
                    onClick={() => deleteTask(id) }
                    style={{ width: '90%', margin: '1%'}}
                >
                    <BsTrash />
                </Button>
            </Center>

        </Paper>
    );
}

{/* <Accordion>
<Accordion.Item value="flexibility">
    <Accordion.Control>
        <Textarea
            value={fieldValue}
            onChange={handleChange}
            disabled={isDisabled}
            size='md'
        />
    </Accordion.Control>
    <Accordion.Panel>
        <Center>
            <Button style={{ width: '30%', margin: '1%'}}
                onClick={() => { handleSave(); setIsDisabled(true)}}
            >
                <AiFillSave />
            </Button>
            <Button
                onClick={() => { setIsDisabled(false) }}
                style={{ width: '30%', margin: '1%'}}
            >
                <TbEdit />
            </Button>
            <Button
                onClick={() => deleteTask(id) }
                style={{ width: '30%', margin: '1%'}}
            >
                <BsTrash />
            </Button>
        </Center>
    </Accordion.Panel>
</Accordion.Item>
</Accordion> */}

export default Task;