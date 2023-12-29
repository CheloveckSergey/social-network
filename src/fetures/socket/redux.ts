import { Middleware, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import { RootState } from "../../app/store";
import SocketClient from "./model";
import { MessageSliceActions } from "../../entities/message/model/redux";
import { Message, Status } from "../../entities/message";
import { Room } from "../../entities/room";
import { CommentsSliceActions } from "../../entities/comment/model/redux";
import { Comment } from '../../entities/comment';

// Here can be any dispatch to open a connection
const INIT_KEY = 'socket/connect';

export enum SocketActionTypes {
  CONNECT = 'socket/connect',
  DISCONNECT = 'socket/disconnect',
  SEND = 'socket/send',
  CREATE_ROOM = 'socket/createRoom',
  READ_MESSAGE = 'socket/readMessage',
  UNREFRESH = 'socket/unrefresh',
  SEND_COMMENT = 'socket/sendComment',
  CONNECT_COMMENTS = 'socket/connectComments',
}

//Приходится делать payload any из-за того, что в мидлтваре всегда должен быть пэйлоад сука
interface ConnectAction {
  type: SocketActionTypes.CONNECT,
  payload: any,
}

interface DisconnectAction {
  type: SocketActionTypes.DISCONNECT,
  payload: any,
}

type SendMessage = {
  text: string;
  userId: number;
  roomId: number;
}

interface SendAction {
  type: SocketActionTypes.SEND,
  payload: SendMessage,
}

interface CreateRoomAction {
  type: SocketActionTypes.CREATE_ROOM,
  payload: Room,
}

type ReadMessage = {
  messageId: number,
  userId: number,
  roomId: number,
}

interface ReadMessageAction {
  type: SocketActionTypes.READ_MESSAGE,
  payload: ReadMessage,
}

interface UnrefreshAction {
  type: SocketActionTypes.UNREFRESH,
  payload: any,
}

type SendComment = {
  creationId: number,
  text: string,
}

interface SendCommentAction {
  type: SocketActionTypes.SEND_COMMENT,
  payload: SendComment,
}

type ConnectCommentsDto = {
  creationId: number,
}

type DisconnectCommentsDto = {
  creationId: number,
}

interface ConnectCommentsAction {
  type: SocketActionTypes.CONNECT_COMMENTS,
  payload: ConnectCommentsDto,
}

interface CommentResDto {
  comment: Comment,
}

type SocketAction = ConnectAction | DisconnectAction | SendAction | CreateRoomAction | ReadMessageAction | UnrefreshAction | SendCommentAction | ConnectCommentsAction;

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export const socketMiddleware = (socket: SocketClient) => {
  const middleware: Middleware<
    {},
    RootState
  > = (params: SocketMiddlewareParams) => (next) => (action: SocketAction) => {
    const { dispatch } = params;
    const state = params.getState();
    const { type, payload } = action;

    const { user } = state.user;

    if (type === INIT_KEY) {
      socket.connect(payload);

      socket.on('connect', () => {
        console.log("СОКЕТ ПОДКЛЮЧИЛСЯ ЕБАТЬ!");
      });

      socket.on('disconnect', () => {
        console.log('СОКЕТ ОТКЛЮЧИЛСЯ ЕБАТЬ');
      })

      socket.on('message', (message: Message) => {
        console.log(message);
        dispatch(MessageSliceActions.addMessage({message}))
      })

      socket.on('readMessage', (newStatus: Status) => {
        console.log(newStatus);
        console.log(state.user);
        if (newStatus.userId === payload.id) {
          console.log('Лал');
          dispatch(MessageSliceActions.deleteMessage({messageId: newStatus.messageId}));
        }
      });

      socket.on('connectComments', (connectCommentsDto: ConnectCommentsDto) => {
        dispatch(CommentsSliceActions.connectRoom({creationId: connectCommentsDto.creationId}));
      });

      socket.on('disconnectComments', (disconnectCommentsDto: DisconnectCommentsDto) => {
        dispatch(CommentsSliceActions.disconnectRoom({creationId: disconnectCommentsDto.creationId}));
      })

      socket.on('comment', (commentResDto: CommentResDto) => {
        console.log('comment in socket');
        dispatch(CommentsSliceActions.addComment({comment: commentResDto.comment}));
      })
    }

    switch (type) {
      // Example EMIT
      case SocketActionTypes.DISCONNECT: {
        socket.disconnect();
        console.log('SOCKET_DISCONNECT');
        break
      }
      case SocketActionTypes.SEND: {
        socket.emit('message', payload);
        break;
      }
      case SocketActionTypes.CREATE_ROOM: {
        socket.emit('createRoom', payload);
        break
      }
      case SocketActionTypes.READ_MESSAGE: {
        socket.emit('readMessage', payload);
        break;
      }
      case SocketActionTypes.SEND_COMMENT: {
        socket.emit('sendComment', {...payload, authorId: user?.author.id});
        break;
      }
      case SocketActionTypes.CONNECT_COMMENTS: {
        const conCommReqDto: ConnectCommentsDto = {
          creationId: payload.creationId,
        }
        socket.emit('connectComments', conCommReqDto);
        break;
      }
      //Проблема в том, что почему-то обработчики не отваливаются, как бы я не старался
      case 'socket/unrefresh': {
        console.log('socket/unrefresh')
        socket.off('connect');
        socket.off('disconnect');
        socket.off('message');
        break;
      }

      default:
        break
    }

    return next(action)
  }

  return middleware;
}

const connectSocket = () => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.CONNECT, payload: ''});
  }
}

const disconnectSocket = () => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.DISCONNECT, payload: ''});
  }
}

const sendMessage = (sendMessage: SendMessage) => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.SEND, payload: sendMessage});
  }
}

const createRoom = (room: Room) => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.CREATE_ROOM, payload: room});
  }
}

const readMessage = (readMessage: ReadMessage) => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.READ_MESSAGE, payload: readMessage});
  }
}

const unrefresh = () => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.UNREFRESH, payload: ''});
  }
}

const sendComment = (sendComment: SendComment) => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.SEND_COMMENT, payload: sendComment});
  }
}

const connectComments = (connectCommentsDto: ConnectCommentsDto) => {
  return (dispatch: Dispatch<SocketAction>) => {
    dispatch({type: SocketActionTypes.CONNECT_COMMENTS, payload: connectCommentsDto});
  }
}

export const SocketActions = {
  connect: connectSocket,
  disconnect: disconnectSocket,
  sendMessage,
  createRoom,
  readMessage,
  unrefresh,
  sendComment,
  connectComments,
} 