 import React from 'react'
 import { useState } from "react";
 import styles from '../styles/OrderDetail.module.css'
 import { useDispatch } from "react-redux";
 import { useRouter } from "next/router";
import axios from 'axios';
import { reset } from "../redux/cartSlice";

 
 const OrderDetail = ({total}) => {
  const router=useRouter()
  const dispatch = useDispatch()
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  async function handleClick () {
    const res = await axios.post("http://localhost:3000/api/orders",{ customer, address, total, method: 0 });
    res.status===201 && router.push("/orders/"+res.data._id)
    dispatch(reset())
  };
   return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
      <h1 className={styles.title}>You will pay $12 after delivery.</h1>
      <div className={styles.item}>
        <label className={styles.label}>Name Surname</label>
        <input
          placeholder="John Doe"
          type="text"
          className={styles.input}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Phone Number</label>
        <input
          type="text"
          placeholder="+1 234 567 89"
          className={styles.input}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Address</label>
        <textarea
          rows={5}
          placeholder="Elton St. 505 NY"
          type="text"
          className={styles.textarea}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={handleClick}>
        Order
      </button>
    </div>
  </div>
   )
 }
 
 export default OrderDetail