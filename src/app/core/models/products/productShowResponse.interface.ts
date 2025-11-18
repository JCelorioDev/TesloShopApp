export interface ProductShowResponseI {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  slug:        string;
  stock:       number;
  sizes:       string[];
  gender:      string;
  tags:        string[];
  user:        User;
  images:      string[];
}

export interface User {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
}
