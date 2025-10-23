import { createClient } from "@supabase/supabase-js";
import {
  VITE_DEFAULT_PHOTO_URL,
  VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_URL,
} from "../utils/Config";

export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

export const DEFAULT_PHOTO_URL = VITE_DEFAULT_PHOTO_URL;

export async function UploadProfileImageSupabase(
  file: File,
  uid: string | undefined
): Promise<{ photoURL: string }> {
  console.log("Starting");

  if (file.name === "fake_file")
    return {
      photoURL: DEFAULT_PHOTO_URL,
    };

  await supabase.storage.from("avatars").remove([`users_avatars/${uid}.jpeg`]);

  const { data: dataDetails, error } = await supabase.storage
    .from("avatars")
    .upload(`users_avatars/${uid}`, file, {
      upsert: true,
    });

  if (error) {
    throw new Error("Upload failed: " + error.message);
  } else {
    console.log("File uploaded:", dataDetails);

    const { data } = await supabase.storage
      .from("avatars")
      .getPublicUrl(`users_avatars/${uid}`);

    return { photoURL: data.publicUrl };
  }
}
