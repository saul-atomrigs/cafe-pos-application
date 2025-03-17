import {
  createContext,
  useState,
  useContext,
  type PropsWithChildren,
} from 'react';
import type { MenuItem, OrderItem } from '~/remotes';

export type CartItem = {
  item: MenuItem;
  quantity: number;
  selectedOptions?: Set<string>;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateCustomerPhone: (phone?: string) => void;
  clearCart: () => void;
  cartTotalAmount: number;
  orderItems: OrderItem[];
  customerPhone?: string;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  updateCustomerPhone: () => {},
  clearCart: () => {},
  cartTotalAmount: 0,
  orderItems: [],
  customerPhone: undefined,
});

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerPhone, setCustomerPhone] = useState<string | undefined>(
    undefined
  );

  const addToCart = ({ item, quantity, selectedOptions }: CartItem) => {
    if (quantity <= 0) return;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.item.id === item.id &&
          areOptionsEqual(cartItem.selectedOptions, selectedOptions)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }

      return [...prevItems, { item, quantity, selectedOptions }];
    });
  };

  // Helper function to compare option sets
  const areOptionsEqual = (options1?: Set<string>, options2?: Set<string>) => {
    if (!options1 && !options2) return true;
    if (!options1 || !options2) return false;
    if (options1.size !== options2.size) return false;

    for (const option of options1) {
      if (!options2.has(option)) return false;
    }

    return true;
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
    return cartItems.reduce((total, { item, quantity, selectedOptions }) => {
      let itemPrice = item.price;

      // Calculate additional price from options
      if (selectedOptions && item.optionGroups) {
        item.optionGroups.forEach((group) => {
          group.options.forEach((option) => {
            if (selectedOptions.has(option.name) && option.price) {
              itemPrice += option.price;
            }
          });
        });
      }

      return total + itemPrice * quantity;
    }, 0);
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

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCustomerPhone,
    clearCart,
    cartTotalAmount,
    orderItems,
    customerPhone,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
