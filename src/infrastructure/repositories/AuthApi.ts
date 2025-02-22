import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { api } from "../../application/services/api";
import { LoginError, LoginResponse } from "@/domain/models/AuthInfra";
import { AxiosError } from "axios";

export class AuthApi implements AuthRepository {
  async login(
    username: string,
    password: string
  ): Promise<LoginResponse | LoginError> {
    const url = "/auth/login";

    try {
      const response = await api.post(url, { username, password });
      return { response: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;

        // Nos aseguramos de que errorData siempre tenga una propiedad "message"
        const errorData: { message: string } =
          typeof error.response?.data === "object" &&
          "message" in error.response?.data
            ? error.response.data
            : { message: "Unknown error" };

        return { error: errorData, status };
      }
      // Si el error no es de Axios, devolvemos un error genérico
      return {
        error: { message: "An unexpected error occurred" },
        status: 500,
      };
    }
  }
}
