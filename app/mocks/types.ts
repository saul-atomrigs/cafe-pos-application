// Types for menu items
export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: 'beverage' | 'dessert';
  image?: string;
  description?: string;
  option?: {
    name: string;
    price?: number;
  }[];
};

// Types for orders
export type OrderItem = {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  pointsEarned: number;
  pointsUsed: number;
  timestamp: string;
  customerPhone?: string;
};

// Type for points
export type Points = {
  phone: string;
  points: number;
};
