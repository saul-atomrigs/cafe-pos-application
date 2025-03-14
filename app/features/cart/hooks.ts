import { ROUTES } from '~/routes';
import { useOrder } from '../order/hooks';
import { useNavigate } from 'react-router';
import { useCartContext } from './context';

export const useCart = () => {
  const navigate = useNavigate();
  const { cartItems, orderItems, cartTotalAmount, clearCart } =
    useCartContext();
  const { mutateAsync: createOrder } = useOrder();

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      return;
    }

    try {
      const orderData = {
        items: orderItems,
        totalAmount: cartTotalAmount,
        pointsUsed: 0,
        customerPhone: undefined,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        clearCart();
        navigate(ROUTES.ORDERS);
      }
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return { handleOrder };
};
