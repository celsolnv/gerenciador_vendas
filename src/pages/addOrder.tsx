import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";
import NumberFormat from '../components/NumberFormat';
import { allClients, allProducts, Client, Order, Product } from '../interfaces/api';
import api from '../services/api';

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
  const [allClients, setAllClients] = useState<allClients>([]);
  const [allProducts, setAllProducts] = useState<allProducts>([]);

  const [product, setProduct] = useState(null)
  const [client, setClient] = useState(null)

  const [valueProduct, setValueProduct] = useState(0);
  const [profitabilityProduct, setProfitabilityProduct] = useState("");
  const [orderForm, setOrderForm] = useState<Order>({
    "id_client": null,
    "id_product": null,
    "price": null,
    "quantity": 1
  });

  const classes = useStyles();
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
  useEffect(() => {
    console.log("Mudando preço");
    const diff = parseFloat(String(valueProduct).replace('.','')) - parseFloat(orderForm.price);
    // const diff = orderForm.price - valueProduct;
    console.log(parseFloat(String(valueProduct).replace('.','')))
    if (diff>0){
      setProfitabilityProduct("Boa");
    }

  }, [orderForm.price])

  const handlePrice = (event:React.ChangeEvent<HTMLInputElement>) =>{
    orderForm.price = parseFloat(event.target.value);
    setOrderForm({
      ...orderForm,
      ["price"]:parseFloat(event.target.value),  
    });
  }
  const handleQuantity = (event:React.ChangeEvent<HTMLInputElement>) =>{
    orderForm.quantity = parseInt(event.target.value);
  }
  const clientSelected = (event: Object, client:Client ) => {
    setClient(client);
    setOrderForm({
      ...orderForm,
      id_client: client.id,
    });
  }
  const productSelected = (event: Object, product:Product) => {
    setProduct(product);
    setOrderForm({
      ...orderForm,id_product:product.id
    });
    setValueProduct(product.price_single);
  }

  const submitForm = () => {
    console.log('enviando')
    console.log(orderForm);
    // api.post("orders", orderForm).then( (response)=>{
    //   console.log(response);
    // } )
  }


  const Form = () => {

    return (
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
            onChange={handlePrice}
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
            onChange={handleQuantity}
            variant="outlined"
            className={classes.inputContainer}
          />
        </div>
        
        {/* Valor unitário do produto (Vem do banco de dados)*/}
        <TextField
          disabled
          id="value_product"
          label="Valor unitário do produto"
          value={valueProduct}
          variant="outlined"
          className={classes.inputContainer}
        />
        {/* Rentabilidade do pedido */}
        <TextField
          disabled
          id="outlined-disabled"
          label="Rentabilidade"
          value = {profitabilityProduct}
          variant="outlined"
          className={classes.inputContainer}
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
    )
  }

  return (
    <div>
      <Form></Form>
    </div>
  )
}