import { Message } from "../../message";
import { MeUser } from "../../user";
import { Room } from "../model";

function getRoomImage(room: Room, user: MeUser): string | undefined {
  if (room.avatar) {
    return room.avatar;
  }

  if (room.type === 'general') {
    return undefined;
  } else {
    const anotherRoomMember = room.roomMembers.find(roomMember => roomMember.user.id != user.id);
    return anotherRoomMember?.user.avatar;
  }
}

function getName(room: Room, user: MeUser): string | undefined {
  if (room.name) {
    return room.name
  }

  if (room.type === 'personal') {
    const anotherRoomMember = room.roomMembers.find(roomMember => roomMember.user.id != user.id);
    return anotherRoomMember?.user.login;
  } else {
    return 'Noname';
  }
}

function getLastMessage(messages: Message[], user: MeUser): Message | undefined {
  if (!messages.length) {
    return undefined;
  }

  return messages.reverse()[0];
}

function getLastMessageText(messages: Message[], user: MeUser): string {
  const lastMessage = getLastMessage(messages, user);
  if (!lastMessage) {
    return 'No messages'
  } else {
    return lastMessage.text;
  }
}

function getLastMessageDate(room: Room, user: MeUser): string {
  const lastMessage = getLastMessage(room.messages, user);
  if (!lastMessage) {
    return room.createdAt
  } else {
    return lastMessage.createdAt
  }
}

export const RoomHelpers = {
  getRoomImage,
  getName,
  getLastMessage,
  getLastMessageText,
  getLastMessageDate,
}