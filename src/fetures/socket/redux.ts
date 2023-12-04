import { Middleware, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'
import { RootState } from "../../app/store";
import SocketClient from "./model";
import { MessageSliceActions } from "../../entities/message/model/redux";
import { Message } from "../../entities/message";

// Here can be any dispatch to open a connection
const INIT_KEY = 'socket/connect';

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export const socketMiddleware = (socket: SocketClient) => {
  const middleware: Middleware<
    {},
    RootState
  > = (params: SocketMiddlewareParams) => (next) => (action) => {
    const { dispatch } = params;
    const { type, payload } = action;

    if (type === INIT_KEY) {
      socket.connect(payload);

      // Example ON
      socket.on('connect', () => {
        console.log("СОКЕТ ПОДКЛЮЧИЛСЯ ЕБАТЬ!");
      });

      socket.on('disconnect', () => {
        console.log('СОКЕТ ОТКЛЮЧИЛСЯ ЕБАТЬ');
      })

      socket.on('message', (message: Message) => {
        // dispatch(MessageSliceActions.addMessage({message}))
        console.log(message);
        dispatch(MessageSliceActions.addMessage({message}))
      })
    }

    switch (type) {
      // Example EMIT
      case 'user/disconnect': {
        socket.disconnect();
        console.log('SOCKET_DISCONNECT');
        break
      }
      case 'socket/send': {
        socket.emit('message', payload);
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

interface SocketStore {
  socket: SocketClient | undefined,
}

const initialState: SocketStore = {
  socket: undefined,
}

interface SetSocketAction {
  socket: SocketClient,
}

// export const socketSlice = createSlice({
//   name: 'socket',
//   initialState,
//   reducers: {
//     setSocket(state, action: PayloadAction<SetSocketAction>) {
//       state.socket = action.payload.socket
//     }
//   }
// })