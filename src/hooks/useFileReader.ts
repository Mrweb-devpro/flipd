import {
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
// import { supabase } from "../db/supabase";
import { useAuthUser } from "./useAuthUser";

//-- This is to handle all the functionality of displaying the image the user has selected before uploading it
export function useFileReader(setFile: Dispatch<SetStateAction<File | null>>) {
  const { user } = useAuthUser();

  //   console.log(user);
  const readerRef = useRef<FileReader | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);

    if (!files) return;

    readerRef.current = new FileReader();
    readerRef.current.onload = function () {
      if (!imageRef.current) return;
      imageRef.current.src = readerRef.current.result?.toString();
    };
    readerRef.current.readAsDataURL(files[0]);

    setFile(files[0]);
    console.log(files[0]);
  };
  //   console.log(file);

  return { imageRef, handleFileChange, setFile };
}
