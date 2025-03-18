import type { OrderResponseData } from '~/remotes';
import { useOrder } from '../order/hooks';
import { useCartContext } from './context';
import { useOrderContext } from '../order/context';

export const useCart = () => {
  const { cartItems, orderItems, cartTotalAmount, clearCart, customerPhone } =
    useCartContext();
  const { orderType } = useOrderContext();
  const { mutateAsync: createOrder } = useOrder();

  const handleOrder = async (): Promise<OrderResponseData> => {
    if (cartItems.length === 0) {
      throw new Error('장바구니가 비어있습니다.');
    }

    const orderData = {
      items: orderItems,
      totalAmount: cartTotalAmount,
      pointsUsed: 0,
      customerPhone: customerPhone || '',
      orderType,
    };

    const result = await createOrder(orderData);

    if (result.success) {
      clearCart();
    }

    return result;
  };

  return { handleOrder };
};
