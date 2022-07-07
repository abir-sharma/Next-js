import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const {quantity}=useSelector(state=>state.cart)
  return (
    <>
    <div className={styles.container} >
       <div className={styles.left}>
         <Link href="/" >
         <Image src="/img/t.png" width="70px" height="70px" />
         </Link>
       </div>
       <div className={styles.cart}>
         <Link href="/cart" passHref>
         <Image src="/img/cartt.jfif" alt="" width="35px" height="35px" />
         </Link>
         <div className={styles.counter}>{quantity}</div>
       </div>
    </div>
    </>
  );
};

export default Navbar;
