import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://dqalzfbrqampcziqspbk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxYWx6ZmJycWFtcGN6aXFzcGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTMwMTksImV4cCI6MjA3NDcyOTAxOX0.-B1EkUC8fLL2u5pMXfBARWYKingKj5L-XAHIkW8-M90";

export const supabase = createClient(supabaseURL, supabaseAnonKey);

export const DEFAULT_PHOTO_URL =
  "https://dqalzfbrqampcziqspbk.supabase.co/storage/v1/object/public/avatars/users_avatars/test_user.png";

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
  // console.log(data);

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
