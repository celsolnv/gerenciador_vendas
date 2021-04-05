import { useEffect, useState } from "react";
import DialogBox from '../components/Dialog';
import LoadingBox from '../components/Loading';
import { SimpleDialogBox } from '../interfaces/generic';
import api from '../services/api';
import { orderMessage, orderMessageByHttp } from "../ultis/message";

export default function addOrder() {

  const [isLoading, setIsLoading] = useState(false)
  const [dialogBox, setDialogBox] = useState({
    "isOpen": false,
    "title": "",
    "description": "",
    "handleClose": null
  })

 

  // Carregando os clientes e produtos do banco de dados
  useEffect(() => {
    setIsLoading(true);
    const url = new URL(window.location.href);
    const order_id = parseInt(url.searchParams.get("id"));
    api.delete(
        `orders/${order_id}`,{data:{"id":order_id}}
        ).then((response) => {
            if(response.status == 200 || response.status==204){
                const message = orderMessageByHttp(response.status)
                showDialog(message);
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
                setIsLoading(false);

            }
        });
    setTimeout(() => {
        setIsLoading(false);
    }, 10000);
  }, [])


    // O tipo da mensagem é o mesmo do retorno da função orderMessage
    const showDialog = (dialog: SimpleDialogBox) => {
    setDialogBox({
        ...dialogBox,
        description: dialog.description,
        title: dialog.title,
        isOpen: true
    })
    }

    return (
        <div>
            <DialogBox
                title={dialogBox.title}
                description={dialogBox.description}
                isOpen={dialogBox.isOpen}
                handleClose={(e) => setDialogBox({ ...dialogBox, isOpen: false })} />
            <LoadingBox isOpen={isLoading} />
        </div>
    )
}