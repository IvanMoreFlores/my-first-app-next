import React from "react";
import "./styles.css"; // Importamos el archivo CSS

type LabelProps = {
  text: string;
  type?: "small" | "medium" | "large"; // Tamaños predefinidos
  color?: string; // Color personalizado
  className?: string; // Clases adicionales opcionales
};

const index: React.FC<LabelProps> = ({
  text,
  type = "medium",
  color,
  className = "",
}) => {
  return (
    <p className={`label ${type} ${className}`} style={{ color }}>
      {text}
    </p>
  );
};

export default index;
