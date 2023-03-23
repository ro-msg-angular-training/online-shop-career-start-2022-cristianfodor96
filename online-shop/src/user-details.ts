export enum Role {
  admin = 'ADMIN',
  customer = 'ADMIN',
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  emailAddress: string;
  roles: Role[];
}
