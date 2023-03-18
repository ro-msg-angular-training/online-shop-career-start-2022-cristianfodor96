export enum Role {
  admin = 'admin',
  customer = 'customer',
}

export interface UserDetails {
  userName: string;
  password: string;
  roles: Role[];
}
