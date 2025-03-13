"use client";
import { AuthApi } from "@/infrastructure/repositories/AuthApi";
import { AuthCases } from "@/application/useCases/AuthCases";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserStore } from "@/presentation/state/userStore";
// import { useUser } from "@/presentation/context/UserConext";

interface User {
  username: string;
  password: string;
}
const useLogin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [userLogin, setUserLogin] = useState<User>({
    username: "",
    password: "",
  });
  const [textInfo, setTextInfo] = useState("");
  const [colorInfo, setColorInfo] = useState("success");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  // const { setUser } = useUser();
  const {setUser} = createUserStore()

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      router.push("/listado");
      return;
    }
    setUserLogin({ username: "ivan", password: "admin" });
    inputRef.current?.focus();
  }, [router]);

  const handleLogin = async (username: string, password: string) => {
    console.log(username);
    console.log(password);
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
        setUserLogin({ username: "", password: "" });
        setError(true);
        setTextInfo("success");
        setColorInfo("success");

        if ("response" in result) {
          console.log(result.response);
          await setUser(result.response);
          await localStorage.setItem("token", result.response.accessToken);
          await localStorage.setItem("username", result.response.username);
          await localStorage.setItem("email", result.response.email);
          await localStorage.setItem("firstName", result.response.firstName);
          await localStorage.setItem("lastName", result.response.lastName);
          await localStorage.setItem("image", result.response.image);
          await router.push("/listado");
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
    setUserLogin({ ...userLogin, [field]: e.target.value });
  };

  return {
    error,
    handleLogin,
    userLogin,
    setUserLogin,
    onChange,
    inputRef,
    textInfo,
    colorInfo,
    buttonDisabled,
  };
};

export default useLogin;
