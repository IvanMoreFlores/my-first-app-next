import React from "react";
import "./styles.css"; // Importamos el archivo CSS

type ButtonProps = {
  text: string;
  variant?: "primary" | "secondary" | "danger" | "waring" | "success"; // Tipos de botón
  size?: "small" | "medium" | "large"; // Tamaños
  onClick?: () => void; // Evento de clic
  disabled?: boolean; // Estado deshabilitado
  className?: string; // Clases adicionales opcionales
};

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`btn ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
