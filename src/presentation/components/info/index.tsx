import React from "react";
import "./styles.css"; // Importamos el archivo CSS
import { DSLabel } from "..";

type InfoProps = {
  text: string;
  type?: "warning" | "error" | "success";
};

const index: React.FC<InfoProps> = ({ text, type }) => {
  return (
    <div className={`div__info ${type}`}>
      <DSLabel color="white" text={text} />
    </div>
  );
};

export default index;
