import { useState, type PropsWithChildren } from 'react';
import { createContext } from '@saul-atomrigs/react';
import type { MenuItem, OrderItem } from '~/remotes';

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateCustomerPhone: (phone?: string) => void;
  clearCart: () => void;
  cartTotalAmount: number;
  orderItems: OrderItem[];
  customerPhone?: string;
};

const CART_CONTEXT_NAME = 'Cart';

const [Provider, useContext] =
  createContext<CartContextType>(CART_CONTEXT_NAME);

export { useContext as useCartContext };

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerPhone, setCustomerPhone] = useState<string | undefined>(
    undefined
  );

  const addToCart = (item: MenuItem, quantity: number) => {
    if (quantity <= 0) return;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }

      return [...prevItems, { item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.item.id !== itemId)
    );
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const updateCustomerPhone = (phone?: string) => {
    setCustomerPhone(phone);
  };

  const clearCart = () => {
    setCartItems([]);
    setCustomerPhone(undefined);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, { item, quantity }) => total + item.price * quantity,
      0
    );
  };
  const cartTotalAmount = getCartTotal();

  const getOrderItems = (): OrderItem[] => {
    return cartItems.map(({ item, quantity }) => ({
      menuItemId: item.id,
      quantity,
      unitPrice: item.price,
    }));
  };
  const orderItems = getOrderItems();

  return (
    <Provider
      cartItems={cartItems}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
      updateCustomerPhone={updateCustomerPhone}
      clearCart={clearCart}
      cartTotalAmount={cartTotalAmount}
      orderItems={orderItems}
      customerPhone={customerPhone}
    >
      {children}
    </Provider>
  );
}
