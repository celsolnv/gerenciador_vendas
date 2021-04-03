import axios from "axios";
import { useEffect, useState } from "react";
import Table from '../components/Table';

export default function Home() {
  const [allProducts, setAllProducts] = useState([{}]);
  const headers = ["Id","Nome do produto","Valor unitário","Múltiplo"]; 
  useEffect(()=>{
      axios.get(
          "http://localhost:3333/products"
        ).then((response)=>{
          console.log("tudo certo");
          console.log(response);
          setAllProducts(response.data);
        });
        
  },[])

  return (
    <div>
      <Table data={allProducts} headers={ headers } ></Table>
    </div>
  )
}
