export interface Product {
    id: number,
    name: string,
    description: string,
    price: number
}

export const products: Array<Product> = [
   {
    id: 1,
    name: "Google Pixel",
    description: "Google Pixel",
    price: 3500
   },
  {
    id: 2,
    name: "Logitech Mouse",
    description: "Logitech Mouse",
    price: 250
  },
  {
    id: 3,
    name: "Razer Headphone",
    description: "Razer Headphones",
    price: 350
  }
]
