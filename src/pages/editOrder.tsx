import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";
import DialogBox from '../components/Dialog';
import Link from '../components/Link';
import LoadingBox from '../components/Loading';
import NumberFormat from '../components/NumberFormat';
import { Client, Order, Product } from '../interfaces/api';
import { SimpleDialogBox } from '../interfaces/generic';
import { getProfitability, validOrder } from '../ruleBusiness/Order';
import api from '../services/api';
import { orderMessage } from '../ultis/message';


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


export default function editOrder() {
  const classes = useStyles();

  const [allClients, setAllClients] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [product, setProduct] = useState<Product>({
    id: null,
    name: "",
    multiple: null,
    price_single: null
  })
  const [client, setClient] = useState<Client>({
    id: null,
    name: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [dialogBox, setDialogBox] = useState({
    "isOpen": false,
    "title": "",
    "description": "",
    "handleClose": null
  })

  const [profitabilityProduct, setProfitabilityProduct] = useState("");

  const [orderForm, setOrderForm] = useState({
    "id_client": null,
    "id_product": null,
    "price": null,
    "quantity": 1,
    "id":null
  });

  // Carregando os clientes e produtos do banco de dados
  useEffect(() => {
    
    const url = new URL(window.location.href);
    const order_id = parseInt(url.searchParams.get("id"));
    api.get(
        `orders/${order_id}`
      ).then((response) => {
        clientSelected(null,response.data[0].client);
        productSelected(null,response.data[0].product);
        setOrderForm({...response.data[0].order,id:order_id});
      });
    api.get(
      "clients"
    ).then((response) => {
      setAllClients(response.data);
    });
    api.get(
        "products"
      ).then((response) => {
        setAllProducts(response.data);
    });

  }, [])

  // Gerando atualização do campo de rentabilidade conforme o valor do item é alterado
  useEffect(() => {
    const profitability = getProfitability({
      "valueItem": orderForm.price,
      "valueProduct": product.price_single
    })
    setProfitabilityProduct(profitability.message);

  }, [orderForm.price])

  // Salva os valores digitados no objeto orderForm (usado para os campos mais genéricos)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderForm({
      ...orderForm,
      [event.target.name]: event.target.value,
    });
  };
  const clientSelected = (event: Object, client: Client) => {
    if (client != undefined) {
      setClient(client);
      setOrderForm({
        ...orderForm,
        id_client: client.id,
      });
    }
    else {
      setClient(null);
      setOrderForm({
        ...orderForm,
        id_client: null,
      });
    }
  }
  const productSelected = (event: Object, product: Product) => {
    if (product != undefined) {
      product.price_single = parseFloat(String(product.price_single).replace(".", ""));
      setProduct(product);
      setOrderForm({
        ...orderForm, id_product: product.id
      });
    }
    else {
      setProduct(null);
      setOrderForm({
        ...orderForm, id_product: null
      });

    }
  }

    const submitForm = () => {
        const checkForm = checkRequiredFields();
        if (!checkForm.status){
            showDialog({
            title: "Preencha todos os campos!",
            description: checkForm.message
            })
            return;
        }
        const checkOrder = validOrder(orderForm, product);
        if (!checkOrder.status) {
            showDialog({
            title: "Não foi possível enviar o pedido",
            description: checkOrder.message
            })
            return;
        }
        setIsLoading(true);
        api.put("orders", orderForm).then((response) => {
            setIsLoading(false);
            if (response.status == 201) {
                const message = orderMessage({ "status": true })
                showDialog(message);
                clearFields();
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            }
            else {
                const message = orderMessage({ "status": false })
                showDialog(message);
            }
        }).catch(e => console.log(e));
        setIsLoading(false);
    }       

    const checkRequiredFields = () => {
    const result = {"message":null,"status":true};
    const keys_orders = Object.keys(orderForm);
    keys_orders.map((key)=>{
        if (orderForm[key] == null || orderForm[key] == undefined || orderForm[key] == NaN || orderForm[key] == "" ){
        result.message = `Todos os campos devem ser preenchidos para 
                            que o pedido seja realizado!`;
        result.status = false;
        return result;
        }
    })
    return result;

    }
    const clearFields = () => {
    // Usa-se NaN para os campos com valores numéricos (null não funciona)
    setOrderForm({...orderForm, id_client: NaN, id_product: NaN, price: NaN, quantity: 1 });
    setProduct({ id: NaN, multiple: NaN, name: "", price_single: NaN });
    setClient({ id: NaN, name: "" });

    }
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

    <div className={classes.formContainer}>
      {/* nome do cliente */}
      <Autocomplete
        getOptionLabel={(option: Client) => option.name}
        options={allClients}
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
          (params) => <TextField {...params} className={classes.inputContainer} label="Produto" variant="outlined" />}
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
        label="Rentabilidade" value={profitabilityProduct}
        variant="outlined" className={classes.inputContainer}
      />

      <div className={classes.groupButton}>
        {/* @ts-ignore */}
        <Link href="/">
          <Button className={classes.btnSubmit}
            variant="contained" color="primary"
          // onClick={}
          > Cancelar </Button>
        </Link>

        <Button className={classes.btnSubmit}
          variant="contained" color="primary"
          onClick={submitForm}
        > Atualizar pedido </Button>
      </div>
    </div>

    {/* Componentes de feedback para o usuário */}
    <DialogBox
      title={dialogBox.title}
      description={dialogBox.description}
      isOpen={dialogBox.isOpen}
      handleClose={(e) => setDialogBox({ ...dialogBox, isOpen: false })} />
    <LoadingBox isOpen={isLoading} />
  </div>
)
}