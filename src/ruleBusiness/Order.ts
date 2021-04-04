// Função para retorna a rentabilidade
interface dataProfitabilityParams{
    valueItem:number,
    valueProduct:number
}
interface returnProfitability{
    message:string,
    status:boolean
}
export function getProfitability(data:dataProfitabilityParams):returnProfitability {
    const percentual = data.valueProduct  *(0.1); 
    const diff = data.valueProduct - data.valueItem;

    const result = {"message":"","status":false}
    if(diff<0){

        result.message = "Ótima";
        result.status = true 
    }
    else if(percentual>=diff){
        result.message = "Boa";
        result.status = true
    }
    else{
        result.message = "Ruim";
    }
    return result;

    
}