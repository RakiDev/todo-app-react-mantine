import { Button, Center, List, Paper, Space, Textarea, TextInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import Task from "./Task";

const getTaskItems = (): string[] | [] => {
    const items: string | null = localStorage.getItem('taskItems');
    if (items === null) return [];
    return JSON.parse(items);
}

// Deep copy array
const arrCopy = (array: string[], replaceIndex: number, replaceValue: string): string[] => {
    const newArray = array.map((val, i) => {
        if (i === replaceIndex) return replaceValue;
        return val;
    });
    return newArray;
}

const MainContent: FC = () => {
    const [task, setTask] = useState<string>("");
    const [taskList, setTaskList] = useState<string[]>(getTaskItems);

    useEffect(() => {
        localStorage.setItem('taskItems', JSON.stringify(taskList))
    }, [taskList]);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        const newValue = e.target.value;
        setTask(newValue);
    }

    function addTask(): void {
        if (task.length === 0 || task === '') return;
        setTaskList((prevTaskItems) => [...prevTaskItems, task]);
        setTask("");
    }

    function deleteTask(id: number): void {
        setTaskList((prevTaskItems) => prevTaskItems.filter((value, index) => index !== id));
    }

    function modifyTask(id: number, mod: string): void {
        setTaskList((prevTaskList) => arrCopy(prevTaskList, id, mod));
    }

    return (<>
        <Paper shadow="xs" style={{ padding: '5%' }}>
            <Textarea
                placeholder="New task"
                label="Task"
                value={task}
                onChange={handleChange}
                minRows={1}
                autosize
                spellCheck={false}
            />
            <Space h="md" />
            <Center>
                <Button
                    style={{ width: "90%" }}
                    onClick={() => addTask()}
                >
                    Add task
                </Button>
            </Center>
        </Paper>
        <Space h="md" />
        <List>
            {taskList.map((value, index) => {
                return (
                    <List key={index}>
                        <Task
                            id={index}
                            value={value}
                            deleteTask={deleteTask}
                            modifyTask={modifyTask}
                        />
                    </List>
                );
            })}
        </List>
    </>
    );
}

export default MainContent;