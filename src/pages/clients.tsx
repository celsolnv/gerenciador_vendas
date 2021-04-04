import axios from "axios";
import { useEffect, useState } from "react";
import Table from '../components/Table';

export default function Home() {
  const [allClients, setAllClients] = useState([{}]);
  const headers = ["Id","Nome"]; 
  useEffect(()=>{
      axios.get(
          "http://localhost:3333/clients"
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
