import type IProductImages from "./IProductImages";
export default interface IProduct {
  id: number | null,
  typeData: string | null,
  empresa_id: number | null,
  specie?: number | null,
  quantity: number,
  like?: boolean | null,
  descripcion: string | null,
  categoria_nombre: string | null,
  sub_categoria_nombre: string | null,
  image: string | null,
  price_invoicing_app?: number | null,
  nombre: string | null,
  images?: Array<IProductImages>
}
