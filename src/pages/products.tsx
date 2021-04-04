import { useEffect, useState } from "react";
import Table from '../components/Table';
import api from '../services/api';

export default function Home() {
  const [allProducts, setAllProducts] = useState([{}]);
  const headers = ["Id","Nome do produto","Valor unitário","Múltiplo"]; 
  useEffect(()=>{
      api.get(
          "products"
        ).then((response)=>{
          console.log("tudo certo");
          console.log(response);
          setAllProducts(response.data);
        });
        
  },[])

  return (
    <div>
      <Table title="Produtos" data={allProducts} headers={ headers } ></Table>
    </div>
  )
}
