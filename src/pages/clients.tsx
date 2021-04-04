import { useEffect, useState } from "react";
import Table from '../components/Table';
import api from '../services/api'
export default function Home() {
  const [allClients, setAllClients] = useState([{}]);
  const headers = ["Id","Nome"]; 
  useEffect(()=>{
      api.get(
          "clients"
        ).then((response)=>{
          setAllClients(response.data);
        });
        
  },[])

  return (
    <div>
      <Table title="Clientes" data={allClients} headers={ headers } ></Table>
    </div>
  )
}
