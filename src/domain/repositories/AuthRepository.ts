import { LoginError, LoginResponse } from "@/domain/models/AuthInfra";

export interface AuthRepository {
    login(username: string, password: string): Promise<LoginResponse | LoginError>;
}