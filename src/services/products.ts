import Product from "@/models/Product";
import { type Product as ProductType } from "@/types";

export async function getProducts() {
  const products = await Product.find() as ProductType[]

  return products;
}
