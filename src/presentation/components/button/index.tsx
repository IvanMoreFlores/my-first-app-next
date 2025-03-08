import React from "react";
import "./styles.css"; // Importamos el archivo CSS

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary" | "danger" | "waring" | "success"; // Tipos de botón
  size?: "small" | "medium" | "large"; // Tamaños
  onClick?: () => void; // Evento de clic
  disabled?: boolean; // Estado deshabilitado
  className?: string; // Clases adicionales opcionales
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`btn ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
