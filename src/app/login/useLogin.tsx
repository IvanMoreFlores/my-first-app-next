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
  const [buttonDisabled, setButtonDisabled] = useState(false);

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

      // if (!validateEmail(username)) {
      //   setError(true);
      //   setTextInfo("Correo inválido");
      //   setColorInfo("error");
      //   return;
      // }

      const loginUseCase = new AuthCases(new AuthApi());

      const { response, status } = await loginUseCase.login(username, password);

      if (status === 200 || status === 204) {
        setUser({ username: "", password: "" });
        setError(true);
        setTextInfo("success");
        setColorInfo("success");
        console.log(response);
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("username", response.username);
        localStorage.setItem("email", response.email);
        localStorage.setItem("firstName", response.firstName);
        localStorage.setItem("lastName", response.lastName);
        alert("Hola! " + response.firstName);
        // redirect("/dashboard");
      } else {
        inputRef.current?.focus();
        setError(true);
        setTextInfo("Credenciales incorrectas");
        setColorInfo("error");
      }
      console.log(status);
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
