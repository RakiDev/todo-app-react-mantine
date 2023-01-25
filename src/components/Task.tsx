import { Accordion, Button, Center, Paper, Textarea } from "@mantine/core";
import { FC, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { BsTrash } from "react-icons/bs";

interface TaskInterface {
    id: number
    value: string
    modifyTask: (id: number, mod: string) => void;
    deleteTask: (id: number) => void;
}

const Task: FC<TaskInterface> = ({ id, value, deleteTask, modifyTask }) => {
    const [fieldValue, setFieldValue] = useState<string>(value);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        const newValue = e.target.value;
        setFieldValue(newValue);
    }

    function handleSave(): void {
        modifyTask(id, fieldValue);
    }
    return (
        <Paper 
            key={id}
            style={{ padding: '5%', marginBottom: '5%'}}
        >
            <Textarea
                value={fieldValue}
                onChange={handleChange}
                disabled={isDisabled}
                size='md'
            />
            <Center style={{ marginTop: '5%'}}>
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