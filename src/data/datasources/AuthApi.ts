import { AuthRepository } from "../repositories/AuthRepository";
import { api } from "../../services/api/api";

export class AuthApi implements AuthRepository {
  async login(username: string, password: string): Promise<any> {
    const url = "/auth/login";

    try {
      const response = await api.post(url, { username, password });
      return { response: response.data, status: response.status };
    } catch (error) {
      const status = error.response.status || 500;
      return { error: error.response.data, status };
    }
  }
}
