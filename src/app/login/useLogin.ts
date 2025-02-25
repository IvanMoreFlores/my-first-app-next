"use client";
import { AuthApi } from "@/infrastructure/repositories/AuthApi";
import { AuthCases } from "@/application/useCases/AuthCases";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  password: string;
}
const useLogin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [textInfo, setTextInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("success");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser({ username: "ivan", password: "admin" });
    inputRef.current?.focus();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    setButtonDisabled(true);
    try {
      if (!username && !password) {
        setError(true);
        setTextInfo("Ingrese su usuario y contraseña");
        setColorInfo("warning");
        return;
      }

      if (!username) {
        setError(true);
        setTextInfo("Ingrese su usuario");
        setColorInfo("warning");
        return;
      }

      if (!password) {
        setError(true);
        setTextInfo("Ingrese su contraseña");
        setColorInfo("warning");
        return;
      }

      const loginUseCase = new AuthCases(new AuthApi());

      const result = await loginUseCase.login(username, password);
      console.log(result.status);
      if (result.status === 200 || result.status === 204) {
        setUser({ username: "", password: "" });
        setError(true);
        setTextInfo("success");
        setColorInfo("success");

        if ("response" in result) {
          console.log(result.response);
          localStorage.setItem("token", result.response.accessToken);
          localStorage.setItem("username", result.response.username);
          localStorage.setItem("email", result.response.email);
          localStorage.setItem("firstName", result.response.firstName);
          localStorage.setItem("lastName", result.response.lastName);
          router.push("/listado");
        }
      } else {
        inputRef.current?.focus();
        setError(true);
        setTextInfo("Credenciales incorrectas");
        setColorInfo("error");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setTextInfo("Error de servidor");
      setColorInfo("error");
      inputRef.current?.focus();
    } finally {
      setButtonDisabled(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUser({ ...user, [field]: e.target.value });
  };

  return {
    error,
    handleLogin,
    user,
    setUser,
    onChange,
    inputRef,
    textInfo,
    colorInfo,
    buttonDisabled,
  };
};

export default useLogin;
