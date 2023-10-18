
export interface ProductType{
  name:string,
  descriptions:string[],
  id:string,
  detail:string,
  priceNGN:number,
  imagesUrl:string[],
  mainImageUrl:string,
  category:CategoryType,
  collection?:string
}
type CategoryType = "bags" | "accessories"
