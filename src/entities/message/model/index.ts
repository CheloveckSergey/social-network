import { Room } from "../../room";
import { OneUser } from "../../user";

export interface Message {
  id: number,
  text: string,
  user: OneUser,
  room: Room
}