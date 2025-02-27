import Image from "next/image";
import React from "react";
// import styles from "./Card.module.css";
// import styles from "./Card.module.sass";
import styles from "./Card.module.scss";
import { useRouter } from "next/navigation";

interface ICardProps {
  title: string;
  thumbnail: string;
  description: string;
  id: number;
}

const CardTwo = ({ title, thumbnail, description, id }: ICardProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/detalle?id=${id}`);
  };

  return (
    <div onClick={onClick} className={styles.card}>
      <Image src={thumbnail} alt={title} width={150} height={150} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default CardTwo;
