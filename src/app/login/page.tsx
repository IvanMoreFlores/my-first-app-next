"use client";
import { DSButton, DSInfo, DSInput, DSLabel } from "@/components";
import React from "react";
import "./styles.css";
import useLogin from "./useLogin";

const LoginPage = () => {
  const { error, handleLogin, onChange, user, inputRef } = useLogin();
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
          ref={inputRef}
          onChange={(e) => onChange(e, "username")}
          placeholder="Ingrese su usuario"
        />
        <DSLabel text="Contraseña" />
        <DSInput
          onChange={(e) => onChange(e, "password")}
          placeholder="Ingrese su contraseña"
          type="password"
        />
      </div>
      {error && <DSInfo text="Credenciales incorrectas"></DSInfo>}
      <DSButton
        onClick={() => handleLogin(user.username, user.password)}
        variant="success"
        text="Ingresar"
      ></DSButton>
    </div>
  );
};

export default LoginPage;
