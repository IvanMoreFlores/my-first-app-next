"use client";
import { DSButton, DSInfo, DSInput, DSLabel } from "@/presentation/components";
import React from "react";
import "./styles.css";
import useLogin from "./useLogin";

const LoginPage = () => {
  const {
    error,
    handleLogin,
    onChange,
    user,
    inputRef,
    textInfo,
    colorInfo,
    buttonDisabled,
  } = useLogin();
  return (
    <div className="div__login">
      <DSLabel
        type="large"
        className="underline"
        text="Ingrese sus credenciales"
      />
      <div>
        <DSLabel text="Usuario" />
        <DSInput
          value={user.username}
          ref={inputRef}
          onChange={(e) => onChange(e, "username")}
          placeholder="Ingrese su usuario"
        />
        <DSLabel text="Contraseña" />
        <DSInput
          value={user.password}
          onChange={(e) => onChange(e, "password")}
          placeholder="Ingrese su contraseña"
          type="password"
        />
      </div>
      {error ? (
        <DSInfo type={colorInfo as "success"} text={textInfo}></DSInfo>
      ) : (
        <></>
      )}
      <DSButton
        onClick={() => handleLogin(user.username, user.password)}
        variant="success"
        text="Ingresar"
        disabled={buttonDisabled}
      ></DSButton>
    </div>
  );
};

export default LoginPage;
