import axios from "axios";
import api from "../../../shared/http";

export interface ReqAuthDto {
  login: string,
  password: string,
}

export interface ResAuthDto {
  id: number,
  login: string,
  avatar: string,
  accessToken: string,
}

// export interface LogoutReq {
//   userId: number
// }

export interface LogoutRes {
  message: string
}

class AuthApi {
  static async registration(authDto: ReqAuthDto) {
    const response = await api.post<ResAuthDto>(
      '/auth/registration',
      authDto
    );
    return response;
  }

  static async login(authDto: ReqAuthDto) {
    const response = await api.post<ResAuthDto>(
      '/auth/login',
      authDto
    );
    return response;
  }

  static async refresh() {
    const response = await api.post<ResAuthDto>(
      '/auth/refresh'
    );
    return response;
  }

  static async logout(userId: number) {
    const response = await api.post<LogoutRes>(
      '/auth/logout',
      {userId}
    );
    return response;
  }
}

export default AuthApi;