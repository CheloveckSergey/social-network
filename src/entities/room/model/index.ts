import { Message } from "../../message";
import { OneUser } from "../../user"

export type RoomMemberType = 'admin' | 'moderator' | 'user';

export type RoomType = 'general' | 'personal';

export interface RoomMember {
  user: OneUser,
  type: RoomMemberType,
}

export interface Room {
  id: number,
  name: string | undefined,
  roomMembers: RoomMember[],
  messages: Message[],
  type: RoomType
}