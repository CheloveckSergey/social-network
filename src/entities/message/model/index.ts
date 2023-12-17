import { Room } from "../../room";
import { OneUser } from "../../user";

export interface Message {
  id: number,
  text: string,
  user: OneUser,
  userId: number,
  roomId: number,
  room: Room,
  createdAt: string,
  updatedAt: string,
}

export interface SentMessage {
  text: string,
  userId: number,
  roomId: number,
}

export interface Status {
  id: number,
  userId: number,
  messageId: number,
  message: Message,
  statud: boolean,
}

export * from './redux';