import { Button, Center, Container, Group, MediaQuery, Modal, Paper, Space, Textarea } from "@mantine/core";
import { nanoid } from "nanoid";
import { FC, useEffect, useState } from "react";
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillWarning } from 'react-icons/ai';
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
    const [opened, setOpened] = useState(false);

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
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key !== 'Enter') return;
        // Prevent from making a new line when pressing enter
        e.preventDefault();
        addTask();
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
                onKeyDown={handleKeyDown}
            />
            <Space h="md" />
            <Center>
                <Button
                    style={{ width: "70%" }}
                    onClick={() => addTask()}
                >
                    Add task
                </Button>
                <Button
                    color='red'
                    style={{ width: '30%', marginLeft: '2%' }}
                    onClick={() => setOpened(true)}
                >
                    <BsFillTrashFill />

                    <Modal
                        opened={opened}
                        onClose={() => setOpened(false)}
                        title={<><AiFillWarning color='red' /> Are you sure you want to delete all tasks?</>}
                    >
                    <Container>
                        <Button
                            color='green'
                            style={{ width: '45%', marginRight: '2%' }}
                            onClick={() => { setOpened(false); setTaskList([])}}
                        >
                            Yes
                        </Button>
                        <Button
                            color='red'
                            style={{ width: '45%' }}
                            onClick={() => setOpened(false)}
                        >
                            No
                        </Button>
                    </Container>
                    </Modal>
                </Button>
            </Center>
        </Paper>
        <Space h="md" />
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <ul style={{ margin: 0, padding: 0 }}>
                {taskList.map((value, index) => {
                    return (
                        <li key={nanoid(10)} style={{ listStyle: 'none' }}>
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
        </MediaQuery>
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
            <ul style={{ margin: 0, padding: 0 }}>
                <Group>
                    {taskList.map((value, index) => {
                        return (
                            <li key={nanoid(10)} style={{ listStyle: 'none', margin: 10 }}>
                                <Task
                                    id={index}
                                    value={value}
                                    deleteTask={deleteTask}
                                    modifyTask={modifyTask}
                                />
                            </li>
                        );
                    })}
                </Group>
            </ul>
        </MediaQuery>
    </div>
    );
}

export default MainContent;