export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
}

export type MenuCategory =
  | 'Appetizers'
  | 'Side Order / Momos'
  | 'Soup'
  | 'Rice & Noodles'
  | 'Roti & Breads'
  | 'Pasta & Maggie'
  | 'Main Course'
  | 'Biryani';
