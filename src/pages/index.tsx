import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from '../components/Link';
import Table from '../components/Table';
import {allOrders} from '../interfaces/api';


export default function Home() {
  const [allOrders, setAllOrders] = useState<allOrders>([]);
  const headers = ["Id","Nome do produto","Cliente","Quantidade","Valor total"]; 
  useEffect(()=>{
      axios.get(
          "http://localhost:3333/orders"
        ).then((response)=>{
          console.log(response.data)
          setAllOrders(response.data);
        });
        
  },[])
  
  return (
    <div>
      <Link href="/addOrder">
        <Button startIcon={<AddIcon/>} 
          variant="contained" color="primary">
          Novo pedido
        </Button>
      </Link>
      <Table title="Pedidos" data={allOrders} headers={ headers } ></Table>
    </div>
  )
}
