import { BackgroundImage, Button, ColorInput, Divider, FileInput, Paper, Space } from "@mantine/core";
import { FC, useEffect, useState } from "react";

const toBase64 = (file: File | Blob) => new Promise<string | undefined>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const readerRes = reader.result;
        if (readerRes instanceof ArrayBuffer || readerRes === null ) return;
        resolve(readerRes);
    };
    reader.onerror = error => reject(error);
});

function base64ToFile(base64: string): File {
    // extract the mime type and the data from the base64 string
    const [mimeType, data] = base64.split(',');
    // convert the base64 string to a byte array
    const byteArray = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        byteArray[i] = data.charCodeAt(i);
    }
    // create a new Blob object with the mime type and the byte array
    const file = new Blob([byteArray], { type: mimeType });
    return file as File;
}

const getImageURL = (): string => {
    const file = localStorage.getItem('backgroundImage');
    if (file === null) return '';
    const newURL = URL.createObjectURL(base64ToFile(file));
    if (newURL?.length === 0 || newURL === '' || newURL === null) return '';
    return newURL;
}

const getImage = (): File | null => {
    const file = localStorage.getItem('backgroundImage');
    if (file === null) return null;
    return base64ToFile(file); 
}

const Settings: FC = () => {
    const [color, setColor] = useState<string>('');
    const [file, setFile] = useState<File | null>(getImage);
    const [fileURL, setFileURL] = useState<string>(getImageURL);

    useEffect(() => {
        async function processFile(): Promise<string | undefined> {
            if (file === null) return; 
            const fileRes = await toBase64(file);
            if (fileRes === undefined) return;
            localStorage.setItem('backgroundImage', fileRes);
        }
        processFile()
            .catch(console.error)
    }, [file]);

    async function handleImageChange(newFile: File | null): Promise<void> {
        if (newFile === null) return;
        setFile(newFile);
        setFileURL(URL.createObjectURL(newFile));
    }

    return (
        <div>
            <Divider my="md" label="Background" labelPosition="center" />
            <FileInput
                placeholder="Image (PNG, JPG)"
                label="Choose a background image"
                value={file}
                onChange={handleImageChange}
                accept="image/png,image/jpeg"
            />
            <Space h="sm" />
            <Button onClick={() => console.log(file, fileURL)}>
                Remove background image
            </Button>
            <Space h="md" />
            <ColorInput value={color} onChange={setColor} label="Or a color!"/>
            <Space h="sm" />
            <Button>
                Remove background color
            </Button>
            <BackgroundImage src={fileURL}>
                <div style={{ height: 400 }}></div>
            </BackgroundImage>
        </div>
    );
}

export default Settings;