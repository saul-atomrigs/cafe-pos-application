import { Button } from '@saul-atomrigs/design-system';
import { CartTotal } from './total';
import { CartList } from './list';
import { useCartContext } from '../context';
import { useCart } from '../hooks';

export const Cart = () => {
  const { cartItems } = useCartContext();
  const { handleOrder } = useCart();

  return (
    <div className='cart-container'>
      <div className='cart-content'>
        <div className='cart-details'>
          <CartList items={cartItems} />
          <CartTotal />
        </div>
        <div className='cart-action'>
          <Button onClick={handleOrder}>주문 완료하기</Button>
        </div>
      </div>
    </div>
  );
};
