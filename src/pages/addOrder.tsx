import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";
import NumberFormat from '../components/NumberFormat';
import { Client, Order, Product } from '../interfaces/api';
import { getProfitability } from '../ruleBusiness/Order';
import api from '../services/api';
import DialogBox from '../components/Dialog';
import LoadingBox from '../components/Loading';
import {orderMessage} from '../ultis/message';

const useStyles = makeStyles((theme: Theme) => ({
  autocompleteContainer: {
    // padding: theme.spacing(2),
    width: '100%',
    boxSizing: 'border-box',

  },
  inputContainer: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  groupInput: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  groupButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  btnSubmit: {
    padding: theme.spacing(3),
  }
}))


export default function addOrder() {
  const classes = useStyles();

  const [allClients, setAllClients] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [product, setProduct] = useState<Product>({})
  const [client, setClient] = useState<Client>({})

  const [isLoading, setIsLoading] = useState(false) 
  const [dialogBox, setDialogBox] = useState({
    "isOpen":false,
    "title":"",
    "description":"",
    "handleClose":null
  })

  const [profitabilityProduct, setProfitabilityProduct] = useState("");

  const [orderForm, setOrderForm] = useState<Order>({
    "id_client": null,
    "id_product": null,
    "price": null,
    "quantity": 1
  });

  // Carregando os clientes e produtos do banco de dados
  useEffect(() => {
    api.get(
      "clients"
    ).then((response) => {
      setAllClients(response.data);
    });

  }, [])
  useEffect(() => {
    api.get(
      "products"
    ).then((response) => {
      setAllProducts(response.data);
    });

  }, [])
  // Gerando atualização do campo de rentabilidade conforme o valor do item é alterado
  useEffect(() => {
    const profitability = getProfitability({
      "valueItem":orderForm.price,
      "valueProduct":product.price_single
    })
    setProfitabilityProduct(profitability.message);
  
  }, [orderForm.price])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(orderForm);
    console.log(event.target.value);
    setOrderForm({
      ...orderForm,
      [event.target.name]: event.target.value,
    });
  };
  const clientSelected = (event: Object, client:Client ) => {
    if(client!=undefined){
      setClient(client);
      setOrderForm({
        ...orderForm,
        id_client: client.id,
      });
    }
    else{
      setClient(null);
      setOrderForm({
        ...orderForm,
        id_client: null,
      });
    }
  }
  const productSelected = (event: Object, product:Product) => {
    if(product!=undefined){
      product.price_single =  parseFloat(String(product.price_single).replace(".",""));
      setProduct(product);
      setOrderForm({
        ...orderForm,id_product:product.id
      });
    }
    else{
      setProduct(null);
      setOrderForm({
        ...orderForm,id_product:null
      });

    }
  }

  const submitForm = () => {
    setIsLoading(true);
    api.post("orders", orderForm).then( (response)=>{
      setIsLoading(false);
      console.log(response);
      if (response.status==201){
          const message = orderMessage({"status":true})
          setDialogBox({
            ...dialogBox,
            description:message.description,
            title       : message.title,
            isOpen : true
          })
      }
    })
  }


  return (
    <div>
           
     <div className={classes.formContainer}>
        {/* nome do cliente */}
        <Autocomplete
          options={allClients}
          getOptionLabel={(option:Client) => option.name}
          id="client-name"
          value={client}
          onChange={clientSelected}
          className={classes.autocompleteContainer}
           renderInput={
            (params) => <TextField {...params} className={classes.inputContainer} label="Cliente" variant="outlined" />}
        />
        {/* Nome do produto*/}
        <Autocomplete
          options={allProducts}
          getOptionLabel={(option) => option.name}
          id="product-name"
          value={product}
          onChange={productSelected}
          className={classes.autocompleteContainer}
          renderInput={
            (params) => <TextField {...params} className={classes.inputContainer}  label="Produto" variant="outlined" />}
        />

        <div className={classes.groupInput}>
          {/* Valor do produto no pedido */}
          <TextField
            id="price-order"
            label="Preço unitário"
            variant="outlined"
            name="price"
            value={orderForm.price}
            onChange={handleChange}
            InputProps={{
              inputComponent: NumberFormat as any,
            }}
            className={classes.inputContainer}
          />
          {/* Quantity of product */}
          <TextField
            id="quantity-order"
            label="Quantidade"
            name="quantity"
            value={orderForm.quantity}
            onChange={handleChange}
            variant="outlined"
            className={classes.inputContainer}
            type="number"
          />
        </div>
        
        {/* Valor unitário do produto (Vem do banco de dados)*/}
        <TextField disabled id="value_product" label="Valor unitário do produto"
          value={product.price_single} variant="outlined" className={classes.inputContainer}
          InputProps={{
            inputComponent: NumberFormat as any,
          }}
        />
        {/* Rentabilidade do pedido */}
        <TextField disabled id="outlined-disabled"
          label="Rentabilidade" value = {profitabilityProduct}
          variant="outlined" className={classes.inputContainer}
        />

        <div className={classes.groupButton}>
          <Button className={classes.btnSubmit}
            variant="contained" color="primary"
          // onClick={}
          > Cancelar </Button>

          <Button className={classes.btnSubmit}
            variant="contained" color="primary"
            onClick={submitForm}
          > Adicionar pedido </Button>

        </div>
      </div>
      <DialogBox 
        title={dialogBox.title}
        description={dialogBox.description}
        isOpen={dialogBox.isOpen}
        handleClose={(e)=>setDialogBox( {...dialogBox,isOpen:false} ) }  />
      <LoadingBox isOpen={isLoading} />
    </div>
  )
}