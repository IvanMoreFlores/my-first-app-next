"use client";
import { DSButton, DSInfo, DSInput, DSLabel } from "@/presentation/components";
import React from "react";
import "./styles.css";
import useLogin from "./useLogin";
import { Formik } from "formik";
import { validatePassword } from "@/utils";

const LoginPage = () => {
  const {
    error,
    handleLogin,
    onChange,
    userLogin,
    inputRef,
    textInfo,
    colorInfo,
    buttonDisabled,
  } = useLogin();
  return (
    <div className="div__login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {
            email: "",
            password: "",
          };
          if (!values.email) {
            errors.email = "Ingrese un email";
          }
          if (!values.password) {
            errors.password = "Ingrese una contraseña";
          }
          return errors;
        }}
        onSubmit={(values) => {
          handleLogin(values.email, values.password);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <DSLabel text="Usuario" />
              <div>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </div>
              {errors.email && touched.email && errors.email}
              <DSLabel text="Contraseña" />
              <div>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              {errors.password && touched.password && errors.password}
            </div>

            <DSButton
            type="submit"
              style={{ width: "100%", marginBottom: 20, marginTop: 20 }}
              onClick={() => handleLogin(values.email, values.password)}
              variant="success"
              text="Ingresar"
              disabled={buttonDisabled || isSubmitting}
            ></DSButton>
          </form>
        )}
      </Formik>

      {/* <DSLabel
        type="large"
        className="underline"
        text="Ingrese sus credenciales"
      />
      <div>
        <DSLabel text="Usuario" />
        <DSInput
          value={userLogin.username}
          ref={inputRef}
          onChange={(e) => onChange(e, "username")}
          placeholder="Ingrese su usuario"
        />
        <DSLabel text="Contraseña" />
        <DSInput
          value={userLogin.password}
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
        onClick={() => handleLogin(userLogin.username, userLogin.password)}
        variant="success"
        text="Ingresar"
        disabled={buttonDisabled}
      ></DSButton> */}
    </div>
  );
};

export default LoginPage;
