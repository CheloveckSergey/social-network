import { Room } from "../../room";
import { OneUser } from "../../user";

export interface Message {
  id: number,
  text: string,
  user: OneUser,
  room: Room,
  createdAt: string,
  updatedAt: string,
}

export interface SentMessage {
  text: string,
  userId: number,
  roomId: number,
}

export * from './redux';