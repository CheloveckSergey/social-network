import { Message } from "../../message";
import { OneUser, User } from "../../user"

export type RoomMemberType = 'admin' | 'moderator' | 'user';

export type RoomType = 'general' | 'personal';

export interface RoomMember {
  id: number
  userId: number
  user: User,
  roomId: number,
  type: RoomMemberType,
}

export interface Room {
  id: number,
  name: string | undefined,
  roomMembers: RoomMember[],
  messages: Message[],
  type: RoomType,
  avatar: string | undefined,
  createdAt: string,
  updatedAt: string,
}

export type RoomMemberStatus = 'online' | 'offline';