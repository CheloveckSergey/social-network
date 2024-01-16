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
  type: RoomType,
  avatar: string | undefined,
  createdAt: string,
  updatedAt: string,
}

export interface RoomWithMembers extends Room {
  roomMembers: RoomMember[],
}

export interface RoomWithMembersAndLastMessage extends Room {
  roomMembers: RoomMember[],
  messages: Message[],
}

export type RoomMemberStatus = 'online' | 'offline';