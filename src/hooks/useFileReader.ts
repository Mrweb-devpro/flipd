import {
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

//-- This is to handle all the functionality of displaying the image the user has selected before uploading it
export function useFileReader(setFile: Dispatch<SetStateAction<File | null>>) {
  const readerRef = useRef<FileReader | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    readerRef.current = new FileReader();
    readerRef.current.onload = function () {
      if (!imageRef.current) return;
      imageRef.current.src = readerRef.current?.result?.toString() as string;
    };
    readerRef.current.readAsDataURL(files[0]);

    setFile(files[0]);
    console.log(files[0]);
  };

  return { imageRef, handleFileChange, setFile };
}
