import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Head from "next/head";
const Product = ({shirt}) => {
  const dispatch=useDispatch()
  const [price, setPrice] = useState(shirt.prices[0]);
  const [quantity, setQuantity] = useState(1);
  const changePrice = (number) => {
    setPrice(number);
  };

  const handleSize = (e) => {
    changePrice(shirt.prices[e]);
  };

  const handleClick=()=>{
      dispatch(addProduct({...shirt,price,quantity}))
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{shirt.title}</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={shirt.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
       <div className={styles.right}>
         <h1 className={styles.title}>{shirt.title}</h1>
         <span className={styles.price}>${price}</span>
         <p className={styles.desc}>{shirt.desc}</p>
         <h3 className={styles.choose}>Select the size</h3>

         <div className={styles.sizes}>
           <div className={styles.size} onClick={() => handleSize(0)}>
             <Image src="/img/s.jpg" layout="fill" alt="" />
             <span className={styles.number}>Small</span>
        </div>
           <div className={styles.size} onClick={() => handleSize(1)}>
             <Image src="/img/s.jpg" layout="fill" alt="" />
             <span className={styles.number}>Medium</span>
           </div>
           <div className={styles.size} onClick={() => handleSize(2)}>
             <Image src="/img/s.jpg" layout="fill" alt="" />
             <span className={styles.number}>Large</span>
           </div>
         </div>
         <div className={styles.ingredients}> 
           </div>
           <div className={styles.add}>
             <input onChange={(e) => setQuantity(e.target.value)}  type="number" defaultValue={1} className={styles.quantity}/>
             <button className={styles.button} onClick={handleClick} >Add to Cart</button>
         </div>
           </div> 
         </div>
       
  
  )
};

export const getServerSideProps=async({params})=>{
  const res=await axios.get(`http://localhost:3000/api/products/${params.id}`)
  return {
    props:{
      shirt:res.data,
    }
  } 
}



export default Product;



