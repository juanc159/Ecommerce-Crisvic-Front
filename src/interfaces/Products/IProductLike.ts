export default interface IProductLike {
    id: number | null,
    nombre: string | null
    image: string | null,
    categoria_nombre: string | null,
    sub_categoria_nombre: string | null,
    price?: number | null,
}
