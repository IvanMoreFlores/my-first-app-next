"use client";
import { AuthApi } from "@/data/datasources/AuthApi";
import { AuthCases } from "@/domain/usecases/AuthCases";
import { validateEmail } from "@/utils";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    setUser({ username: "ivan", password: "admin" });
    inputRef.current?.focus();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const loginUseCase = new AuthCases(new AuthApi());

    const { response, status } = await loginUseCase.login(username, password);

    console.log(status);

    // if (!username && !password) {
    //   setError(true);
    //   setTextInfo("Ingrese su usuario y contraseña");
    //   setColorInfo("warning");
    //   return;
    // }

    // if (!username) {
    //   setError(true);
    //   setTextInfo("Ingrese su usuario");
    //   setColorInfo("warning");
    //   return;
    // }

    // if (!password) {
    //   setError(true);
    //   setTextInfo("Ingrese su contraseña");
    //   setColorInfo("warning");
    //   return;
    // }

    // if (!validateEmail(username)) {
    //   setError(true);
    //   setTextInfo("Correo inválido");
    //   setColorInfo("error");
    //   return;
    // }

    // if (username === "admin" && password === "admin") {
    //   setError(false);
    //   setTextInfo("success");
    // } else {
    //   inputRef.current?.focus();
    //   setError(true);
    //   setTextInfo("Credenciales incorrectas");
    //   setColorInfo("error");
    // }
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
  };
};

export default useLogin;
