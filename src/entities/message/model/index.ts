import { Room } from "../../room";
import { OneUser, User } from "../../user";

export interface Message {
  id: number,
  text: string,
  user: OneUser,
  userId: number,
  roomId: number,
  room: Room,
  createdAt: string,
  updatedAt: string,
  read: boolean,
}

export interface SentMessage {
  text: string,
  userId: number,
  roomId: number,
}

export interface Status {
  id: number,
  userId: number,
  user: User,
  messageId: number,
  message: Message,
  status: boolean,
}

export * from './redux';