import { Socket, io } from "socket.io-client"

export default class SocketClient {
  socket: Socket | null | undefined;

  connect(payload: any) {
    this.socket = io('http://localhost:5000', {
      auth: {
        authDto: payload,
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  emit(eventName: string, data: any) {
    if (this.socket) {
      this.socket.emit(eventName, data)
    }
  }

  on(eventName: string, func: (...args: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, func)
    }
  }

  off(eventName: string) {
    if (this.socket) {
      console.log('Сработал off в классе SocketClient');
      this.socket.off(eventName);
    }
  }
}