export default interface IForm {
  id?: number | null
  name: string | null
  category_id: null | number
  subcategory_id: null | number
  description: string | null
  iva: string | null
  code: string | null
  price: string | null
  images: Array<object>,
}
