import { ProductAttributes } from "../../database/models/MtProduct";

export interface ProductFormatter{
  id: number,
  name: string,
  price: number,
  description: string,
  tags: string,
  createdAt :any,
  updatedAt : any,
  category?: CategoryFormatter,
  galleries?: GalleryFormatter[]
}

export interface CategoryFormatter{
  id: number,
  name: string,
}

export interface GalleryFormatter{
  id: number,
  url: string
}

export function FormatProduct(product: ProductAttributes): ProductFormatter{
  console.log(product);
  const format: ProductFormatter = {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    tags: product.tags,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    category: product.category ? {
      id: product.category.id,
      name: product.category.name
    } : undefined,
    galleries: product.galleries ? product.galleries.map((gallery: any) => ({
      id: gallery.id,
      url: `localhost:3000${gallery.file}`,
    })) : [],
  }

  return format;
}

export function FormatAll(products: ProductAttributes[]): ProductFormatter[]{
  const format: ProductFormatter[] = []

  for(const item of products){
    const productFormatter = FormatProduct(item)
    format.push(productFormatter)
  }

  return format
}

