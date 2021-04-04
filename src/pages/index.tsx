import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from '../components/Link';
import Table from '../components/Table';
export default function Home() {
  const [allOrders, setAllOrders] = useState([{}]);
  const headers = ["Id","Nome do produto","Valor unitário","Múltiplo"]; 
  useEffect(()=>{
      axios.get(
          "http://localhost:3333/orders"
        ).then((response)=>{
          setAllOrders(response.data);
        });
        
  },[])
  
  return (
    <div>
      <Link href="addOrder">
        <Button startIcon={<AddIcon/>} 
          variant="contained" color="primary">
          Novo pedido
        </Button>
      </Link>
      <Table data={allOrders} headers={ headers } ></Table>
    </div>
  )
}
