export interface ProductResponseI {
  count:    number;
  pages:    number;
  products: Product[];
}

export interface Product {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  sizes:       Size[];
  gender:      string;
  tags:        Tag[];
  images:      string[];
  user:        User;
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
}

export enum Tag {
  Hats = "hats",
  Jacket = "jacket",
  Shirt = "shirt",
}

export interface User {
  id:       string;
  email:    Email;
  fullName: FullName;
  isActive: boolean;
  roles:    Role[];
}

export enum Email {
  Test1GoogleCOM = "test1@google.com",
}

export enum FullName {
  TestOne = "Test One",
}

export enum Role {
  Admin = "admin",
}
