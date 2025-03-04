"use client";

import { IUser, User } from "@/domain/repositories/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function usePosts() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<IUser>(
        "https://dummyjson.com/users?limit=100"
      );
      return response.data.users;
    },
  })
}

export default function UsersReactQuery() {
  const {
    data: users,
    isLoading,
    error,
  } = usePosts();

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Usuarios con React Query</h2>
      <ul>
        {users?.map((user: User) => (
          <li key={user.id}>
            {user.firstName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
