import { Button } from '@saul-atomrigs/design-system';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes';
import { useCartContext } from '../context';
import { useCart } from '../hooks';
import { CartList } from './list';
import { CartTotal } from './total';
import { useOrderContext } from '~/features/order/context';

export const CartContent = () => {
  const { cartItems } = useCartContext();
  const { handleOrder } = useCart();
  const navigate = useNavigate();

  const { orderType } = useOrderContext();
  const handleClickOrder = async () => {
    const result = await handleOrder();

    if (result?.success) {
      navigate(ROUTES.ORDERS);
    } else {
      throw new Error('주문 실패: 유효한 주문 항목이 없습니다.');
    }
  };

  return (
    <div className='cart-content'>
      <div className='cart-details'>
        <CartList items={cartItems} />
        <CartTotal />
        {orderType}
      </div>
      <div className='cart-action'>
        <Button onClick={handleClickOrder} disabled={cartItems.length === 0}>
          주문 완료하기
        </Button>
      </div>
    </div>
  );
};
