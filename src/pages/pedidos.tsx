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
    "price": 0,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(orderForm);
    console.log(event.target.value);
    setOrderForm({
      ...orderForm,
      [event.target.name]: event.target.value,
    });
  };


  const Form = () => {

    return (
      <div className={classes.formContainer}>

      </div>
    )
  }

  return (
    <div>
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
            onChange={handleChange}
            value={orderForm.quantity}
            variant="outlined"
            className={classes.inputContainer}
          />
        </div>
    </div>
  )
}