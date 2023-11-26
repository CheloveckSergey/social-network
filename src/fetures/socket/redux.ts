import { Middleware, createSlice } from "@reduxjs/toolkit";

import { Dispatch } from 'redux'
import { RootState } from "../../app/store";
import SocketClient from "./model";

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
      socket.connect()

      // Example ON
      socket.on('connect', () => {
        console.log("СОКЕТ ПОДКЛЮЧИЛСЯ ЕБАТЬ!");
      })
    }

    switch (type) {
      // Example EMIT
      case 'user/disconnect': {
        socket.emit('joinRoom', payload.room)
        break
      }

      default:
        break
    }

    return next(action)
  }

  return middleware;
} 

