import {Order,Product} from '../interfaces/api';
import {isNumeric} from '../ultis/functions';
// Função para retorna a rentabilidade
interface dataProfitabilityParams{
    valueItem:number,
    valueProduct:number
}
interface returnProfitability{
    cod:number,
    message:string,
    status:boolean,
}
interface genericReturn{
    status:boolean,
    message:string
}
export function getProfitability(data:dataProfitabilityParams):returnProfitability {
    const percentual = data.valueProduct  *(0.1); 
    const diff = data.valueProduct - data.valueItem;

    const result = {"cod":NaN, "message":"","status":false}
    if(diff<0){
        result.cod = 1
        result.message = "Ótima";
        result.status = true 
    }
    else if(percentual>=diff){
        result.cod = 2
        result.message = "Boa";
        result.status = true
    }
    else{
        result.cod = 3
        result.message = "Ruim";
    }
    return result;

}

export function validOrder(order:Order,product:Product):genericReturn{
    const result = {"status":true,"message":null}
    const profitability = getProfitability({
        "valueItem":order.price,
        "valueProduct":product.price_single
    });
    if (profitability.cod == 3){
        result.message = "Rentabilidade muito baixa!";
        result.status = false;
    }
    else{
        if (isNumeric(product.multiple)){
            if (order.quantity%product.multiple != 0){
                result.status = false;
                result.message = `Quantidade para este produto só pode ser 
                                    um múltiplo de ${product.multiple}`;
            }
        }
    }
    return result;
}