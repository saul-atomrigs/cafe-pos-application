import { useCartContext } from '../context';
import { CartErrorBoundary } from './error-boundary';
import { CartContent } from './content';

export const Cart = () => {
  const { clearCart } = useCartContext();

  return (
    <div className='cart-container'>
      <CartErrorBoundary onReset={clearCart}>
        <CartContent />
      </CartErrorBoundary>
    </div>
  );
};
