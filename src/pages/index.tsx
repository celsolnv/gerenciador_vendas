import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useEffect, useState } from "react";
import Link from '../components/Link';
import Table from '../components/Table';
import {allOrders} from '../interfaces/api';
import api from '../services/api'


export default function Home() {
  const [allOrders, setAllOrders] = useState<allOrders>([]);
  const headers = ["Id","Nome do produto","Cliente","Quantidade","Valor total","Ações"]; 
  useEffect(()=>{
      api.get(
          "orders"
        ).then((response)=>{
          console.log(response.data)
          setAllOrders(response.data);
        });
        
  },[])
  
  return (
    <div>
      {/* @ts-ignore */}
      <Link href="/orders/addOrder">
        <Button startIcon={<AddIcon/>} 
          variant="contained" color="primary">
          Novo pedido
        </Button>
      </Link>
      <Table title="Pedidos" data={allOrders} headers={ headers } hasActions={true} ></Table>
    </div>
  )
}
