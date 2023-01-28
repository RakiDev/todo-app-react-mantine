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

export default Task;