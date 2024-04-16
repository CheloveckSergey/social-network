import { Author, OneAuthor } from "../../author";
import { User } from "../../user";

export interface Group {
  id: number,
  name: string,
  avatar: string | undefined,
  membersNumber: number,
  authorId: number,
  author: Author,
}

export interface OneGroup extends Group {
  author: OneAuthor,
}

export interface OneGroupWithMembership extends OneGroup {
  membership: GMTypes | undefined,
  request: MembershipRequest | undefined,
}

export enum GMTypes {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

export interface GroupMember {
  id: number,
  userId: number;
  user: User;
  groupId: number;
  gmType: GMTypes;
}

export enum GroupMembershipStatuses {
  WAITING = 'waiting',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface MembershipRequest {
  id: number;
  userId: number;
  user: User;
  groupId: number;
  status: GroupMembershipStatuses;
}