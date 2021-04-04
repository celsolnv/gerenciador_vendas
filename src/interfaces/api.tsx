export interface Client{
    id:number, 
    name:string, 
}
export interface Product{
    id:number, 
    name:string, 
    price_single:number,
    multiple:number,
}
export interface Order{
    id_product:number,
    id_client:number,
    price:number,
    quantity:number
}
export interface allClients{
    [index: number]: Client
}
export interface allProducts{
    [index: number]:Product
}
export interface allOrders{
    [index: number]:Order
}