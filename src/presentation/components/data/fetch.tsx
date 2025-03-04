import { User } from "@/domain/repositories/data";
import { useEffect, useState } from "react";

export default function UsersFetch() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=5")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
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
      <h2>Lista de Usuarios con Fetch</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
