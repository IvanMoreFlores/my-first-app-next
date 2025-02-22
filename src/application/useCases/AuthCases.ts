import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { LoginError, LoginResponse } from "@/domain/models/AuthInfra";

export class AuthCases {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(username: string, password: string): Promise<LoginResponse | LoginError> {
    return await this.authRepository.login(username, password);
  }
}
