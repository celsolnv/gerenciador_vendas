interface messageOrderInput{
    status:boolean
}
export interface messageOrderOutput{
    status:boolean,
    description:string,
    title:string
}
export interface genericMessage{
    title:string,
    description:string
}
export function orderMessage( data:messageOrderInput ):messageOrderOutput{
    const result = <messageOrderOutput>{};
    if(data.status){
        result.title = "Seu pedido foi enviado com sucesso!";
        result.description = `Caso deseje visualizar seu pedido, 
        vá para o menu inicial ou basta clicar na barra ao lado na opção Pedidos.`;
    }
    else{
        result.title = "Não foi possível enviar seu pedido";
        result.description = `Caso deseje visualizar seu pedido, 
        vá para o menu inicial ou basta clicar na barra ao lado na opção Pedidos.`;
    }
    return result;
}
export function orderMessageByHttp( statusHttp:number ):genericMessage{
    const result = <genericMessage>{};
    switch (statusHttp) {
        // Delete
        case 204:
            result.title = "Pedido excluído com sucesso ";
            result.description = "Você será redirecionado automaticamente para a página inicial";
            return result;
            break;  
    
        default:
            break;
    }
}