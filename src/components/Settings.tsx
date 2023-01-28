import { BackgroundImage, Button, ColorInput, Divider, FileInput, Paper, Space } from "@mantine/core";
import { FC, useState } from "react";

interface SettingsInterface { 
  setFileURL: React.Dispatch<React.SetStateAction<string | null>>
  fileURL: string | null
}

const Settings: FC<SettingsInterface> = ({ setFileURL, fileURL}) => {
    const [color, setColor] = useState<string>('');

    const fr = new FileReader();
    fr.onload = function (event) {
      console.log(event, fr.result);
      if(typeof fr.result !== "string") throw new Error("FileReader$readAsDataURL did not generate a string");
      setFileURL(fr.result);
    };
    fr.onabort = () => console.log("aborted"); // no need to handle this
    fr.onerror = () => console.log("errored"); // you should really handle this

    async function handleImageChange(payload: File | null): Promise<void> {
      if (payload === null) {
        setFileURL(null);
      }
      else {
        fr.abort(); // Abort whatever previous image the FileReader was reading
        fr.readAsDataURL(payload);  
      }
    }

    return (
        <div>
            <Divider my="md" label="Background" labelPosition="center" />
            <FileInput
                placeholder="Image (PNG, JPG)"
                label="Choose a background image"
                onChange={handleImageChange}
                accept="image/png,image/jpeg"
            />
            <Space h="sm" />
            <Button onClick={() => console.log(fileURL)}>
                Remove background image
            </Button>
            <Space h="md" />
            <ColorInput value={color} onChange={setColor} label="Or a color!"/>
            <Space h="sm" />
            <Button>
                Remove background color
            </Button>
            <BackgroundImage src={fileURL === null ? '' : fileURL}>
                <div style={{ height: 400 }}></div>
            </BackgroundImage>
        </div>
    );
}

export default Settings;