import { useEffect, useState } from "react";
import axios from "axios";
import { IUser, User } from "@/domain/repositories/data";

export default function UsersAxios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<IUser>("https://dummyjson.com/users?limit=5")
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios con Axios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
