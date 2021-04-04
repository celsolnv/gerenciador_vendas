interface messageOrderInput{
    status:boolean
}
interface messageOrderOutput{
    status:boolean,
    description:string,
    title:string
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