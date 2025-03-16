import { Button, Txt } from '@saul-atomrigs/design-system';
import { useCartContext } from '../context';
import type { MenuItem } from '~/remotes';

export default function OrderAmountInput({ item }: { item: MenuItem }) {
  const { cartItems, addToCart, updateQuantity } = useCartContext();
  const cartItem = cartItems.find((cartItem) => cartItem.item.id === item.id);

  const amount = cartItem ? cartItem.quantity : 0;

  const handleIncrement = () => {
    if (amount === 0) {
      addToCart(item, 1);
    } else {
      updateQuantity(item.id, amount + 1);
    }
  };

  const handleDecrement = () => {
    if (amount > 0) {
      updateQuantity(item.id, amount - 1);
    }
  };
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button
        variant='secondary'
        onClick={handleDecrement}
        disabled={amount === 0}
      >
        -
      </Button>
      <Txt size='xl' weight='bold'>
        {amount}
      </Txt>
      <Button variant='primary' onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
}
