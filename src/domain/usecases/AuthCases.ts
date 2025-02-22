import { AuthRepository } from "@/data/repositories/AuthRepository";

export class AuthCases {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(username: string, password: string): Promise<any> {
    return this.authRepository.login(username, password);
  }
}
