export default interface IOrder {
    id: number
    customer_id : number
    customer_name: string,
    state_id: number
    state_name: string,
    company_id: number
    company_name: string
    customer_address_id: number
    customer_address_name: string
    deliver_date: string
    products: [object]
    customer_address: string
    created_at: string
}