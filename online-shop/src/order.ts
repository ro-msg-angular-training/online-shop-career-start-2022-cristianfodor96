import { OrderDetails } from './order-details';

export interface Order {
  orderDetails: OrderDetails[];
  created: number;
  country: string;
  city: string;
  county: string;
  street: string;
}
