import { createContext, useContext, useState, type ReactNode } from 'react';
import type { OrderType } from '~/remotes';

interface OrderContextProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderType, setOrderType] = useState<OrderType>('in-store');

  return (
    <OrderContext.Provider value={{ orderType, setOrderType }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
