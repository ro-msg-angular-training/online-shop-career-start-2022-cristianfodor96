import { Supplier } from './supplier';
import { ProductCategory } from './product-category';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  imgUrl: string;
  supplier: Supplier;
  productCategory: ProductCategory;
}
