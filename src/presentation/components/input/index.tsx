import React from "react";
import "./styles.css"; // Importamos el archivo CSS

type InputProps = {
  type?: "text" | "email" | "password" | "number"; // Tipos de input permitidos
  placeholder?: string; // Texto de ayuda
  value?: string | number; // Valor del input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Manejo de cambio
  disabled?: boolean; // Estado deshabilitado
  error?: boolean; // Indica si hay un error
  className?: string; // Clases adicionales opcionales
  ref?: React.RefObject<HTMLInputElement>; // Referencia al input
};

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = false,
  className = "",
  ref,
}) => {
  return (
    <input
    ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`input ${error ? "input-error" : ""} ${className}`}
    />
  );
};

export default Input;
