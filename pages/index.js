import Head from "next/head";
import ShirtList from "../components/ShirtList";
import styles from "../styles/Home.module.css";
import axios from 'axios'
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton"
import Link from 'next/link'
import baseUrl from "../utils/base";

export default function Home({shirtList,admin}) {
  const [close,setClose]=useState(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>Shirt shop in New Delhi</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {admin && <AddButton setClose={setClose}/>}
      <Link href={`/admin`} passHref>
      <div className={styles.mainAddButton}>
      Admin Login
      </div>
     

      </Link>
   
      <ShirtList shirtList={shirtList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps=async(ctx)=>{
  const myCookie=ctx.req?.cookies || ""
  let admin=false
  if (myCookie.token===process.env.TOKEN){
    admin=true
  }
  const res=await axios.get(`${baseUrl}/api/products`)
  return {
    props:{
      shirtList:res.data,
      admin
    }
  } 
}
