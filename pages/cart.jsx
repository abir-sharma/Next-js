import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch,useSelector } from "react-redux";
import {useState} from 'react'
import {useRouter} from 'next/router'
import {reset} from "../redux/cartSlice"
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Head from "next/head";



const Cart = () => {
  
  const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart)
  const [open,setOpen]=useState(false)
  const router=useRouter()
  const createOrder=async(data)=>{
    try {
      console.log(data)
      const res=await axios.post("http://localhost:3000/api/orders",data)
      res.status===201 && router.push("/orders/"+res.data._id)
      dispatch(reset())
    } catch (error) {
      console.log(error)
    }
  };
  async function handleToken(token,addresses){
    const address=token.card.address_line1+" "+token.card.address_city+"-"+token.card.address_zip+" "+token.card.address_country
    createOrder({"customer":token.card.name,"address":address,"total":cart.total,"method":0})
  }
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.products.map((product)=>(
            <tr className={styles.tr} key={product._id}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src="/img/pizza.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{product.title}</span>
            </td>
            <td>
              <span className={styles.price}>${product.price}</span>
            </td>
            <td>
              <span className={styles.quantity}>{product.quantity}</span>
            </td>
            <td>
              <span className={styles.total}>${product.quantity*product.price}</span>
            </td>
          </tr>
          ))}
          
         
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {!open && <button className={styles.button} onClick={()=>setOpen(true)} >CHECKOUT NOW!</button>}
          {open && <button className={styles.button} onClick={()=>setOpen(true)} >COD not Availaible</button>}
          {open && <StripeCheckout
          stripeKey="pk_test_51KrJyLSJ7vO7M2EXI5rN9iCkRxPyiaThreeHrjARvABDshHHt21pxVQZXI4E7gwyl8U1vDOH8V0MKszEG1feaPVn00ozROq74X"
          token={handleToken}
          amount={cart.total*100}
          billingAddress
          shippingAddress
          />}
        </div>
        <div className={styles.right}>
      
        </div>
        
      </div>
      
    </div>
  );
};

export default Cart;
