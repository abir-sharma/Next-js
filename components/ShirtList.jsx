import styles from "../styles/ShirtList.module.css";
import ShirtCard from "./ShirtCard"

const ShirtList = ({shirtList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Best Shirts are here !!!</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
          {shirtList.map((shirt)=>(<ShirtCard key={shirt._id} shirt={shirt} />))}
      </div>
    </div>
  );
};

export default ShirtList;
