import { Creation } from "../../creation";
import { User } from "../../user";

export interface Like {
  id: number,
  userId: number,
  user: User,
  creationId: number,
  creation: Creation,
}