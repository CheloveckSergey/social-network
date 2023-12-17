import api from "../../../shared/http";
import { Room } from "../../room";
import { Message } from "../model";

const INITIAL_URL = '/messages'

export class MessageApi {
  static async getAllUnread(userId: number) {
    const response = await api.get<Message[]>(
      INITIAL_URL + '/getAllUnread/' + userId,
    );
    return response.data;
  }
}

export class MReadHistoryApi {
  
}