import { User } from "../../user";

export interface FriendRequest {
  id: number,
  userId1: number,
  user1: User,
  userId2: number,
  user2: User,
  accepted: boolean,
  rejected: boolean,
}
