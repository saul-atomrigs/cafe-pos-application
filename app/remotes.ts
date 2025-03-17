import axios from 'axios';

// Define the axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types based on the API handlers

export type Category = 'beverage' | 'dessert';
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'beverage' | 'dessert';
  image?: string;
  description?: string;
  optionGroups?: {
    name: string;
    exclusive: boolean;
    options: { name: string; price?: number }[];
  }[];
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRequestData {
  items: OrderItem[];
  totalAmount: number;
  pointsUsed?: number;
  customerPhone?: string;
}

export type Order = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  pointsEarned: number;
  pointsUsed: number;
  timestamp: string;
  customerPhone?: string;
};

export interface OrderResponseData {
  success: boolean;
  order: Order;
  message: string;
}

export interface Points {
  points: number;
  phone: string;
}

export interface ReceiptItem extends OrderItem {
  name: string;
  subtotal: number;
}

export interface Receipt {
  orderId: string;
  timestamp: string;
  items: ReceiptItem[];
  totalAmount: number;
  pointsEarned: number;
  pointsUsed?: number;
  finalAmount: number;
  customerPhone?: string;
}

// API functions
export const getMenuAPI = async (): Promise<MenuItem[]> => {
  const response = await api.get<MenuItem[]>('/menu');
  return response.data;
};

export const createOrderAPI = async (
  orderData: OrderRequestData
): Promise<OrderResponseData> => {
  const response = await api.post<OrderResponseData>('/order', orderData);
  return response.data;
};

export const getOrdersAPI = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getPointsAPI = async (phone: string): Promise<Points> => {
  const response = await api.get<Points>(`/points`, {
    params: { phone },
  });
  return response.data;
};

export const getReceiptAPI = async (orderId: string): Promise<Receipt> => {
  const response = await api.get<Receipt>(`/receipt/${orderId}`);
  return response.data;
};

export default api;
