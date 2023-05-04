export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'ADMIN',
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  emailAddress: string;
  roles: Role[];
}
