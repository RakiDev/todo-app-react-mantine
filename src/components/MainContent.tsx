import { Button, Center, Paper, Space, Textarea } from "@mantine/core";
import { nanoid } from "nanoid";
import { FC, useEffect, useState } from "react";
import Task from "./Task";

const getTaskItems = (): string[] | [] => {
    const items: string | null = localStorage.getItem('taskItems');
    if (items === null) return [];
    return JSON.parse(items);
}

// Deep copy array
function arrCopy(prevTaskList: string[], id: number, mod: string): string[] {
    const newTaskList = [...prevTaskList];
    newTaskList[id] = mod;
    return newTaskList;
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
        setTaskList((prevTaskItems) => {
            return prevTaskItems.filter((value, index) => index !== id);
        });
    }

    function modifyTask(id: number, mod: string): void {
        setTaskList(arrCopy(taskList, id, mod));
        console.log(taskList);
    }

    return (<div>
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
        <ul>
            {taskList.map((value, index) => {
                return (
                    <li key={nanoid(10)}>
                        <Task
                            id={index}
                            value={value}
                            deleteTask={deleteTask}
                            modifyTask={modifyTask}
                        />
                    </li>
                );
            })}
        </ul>
    </div>
    );
}

export default MainContent;