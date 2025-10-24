import type { Timestamp } from "firebase/firestore";

//--  POSTS
export type PostsType = {
  id: string;
  date: Timestamp;
  sender: string;
  time: string;
  userId: string;
  content: "";
}[];

//--  USERS
export interface StoreUserType {
  bio: string;
  blocked: string[];
  createdAt: string;
  friends: { status: string; id: string }[];
  photoURL: null | string;
  posts: string[];
  settings: {};
  user_id: string;
  username: string;
}

//--  NOTIFICAIONS
export interface UserNotificationType {
  type: string;
  message: string;
  seen: boolean;
  special: /*unresolved*/ any;
}
