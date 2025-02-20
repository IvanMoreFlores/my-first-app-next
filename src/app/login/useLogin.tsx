"use client";
import { useRef, useState } from "react";

interface User {
  username: string;
  password: string;
}
const useLogin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const handleLogin = (username: string, password: string) => {
    console.log(username);
    console.log(password);
    if (username === "admin" && password === "admin") {
      setError(false);
    } else {
      inputRef.current?.focus();
      setError(true);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUser({ ...user, [field]: e.target.value });
  };

  return { error, handleLogin, user, setUser, onChange, inputRef };
};

export default useLogin;
