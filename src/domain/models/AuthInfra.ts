export interface LoginResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    id: 1;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  };
  status: number;
}

export interface LoginError {
  error: {
    message: string;
  };
  status: number;
}
