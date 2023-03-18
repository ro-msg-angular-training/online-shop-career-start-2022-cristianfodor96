import { OrderDetails } from './order-details';

export interface Order {
  id: number;
  orderDetails: OrderDetails[];
  created: number;
  country: string;
  city: string;
  county: string;
  street: string;
}
