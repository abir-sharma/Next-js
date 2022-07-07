import Image from "next/image";
import styles from "../styles/ShirtCard.module.css";
import Link from 'next/link'

const ShirtCard = ({shirt}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${shirt._id}`} passHref>
      <Image src={shirt.img} alt="shirt" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{shirt.title}</h1>
      <span className={styles.price}>${shirt.prices[0]}</span>
      <p className={styles.desc}>
        {shirt.desc}
      </p>
    </div>
  );
};

export default ShirtCard;


