import { Button, Txt } from '@saul-atomrigs/design-system';
import { useCartContext } from '../context';
import type { MenuItem } from '~/remotes';
import { DEFAULT_QUANTITY } from '~/constants';

export default function OrderAmountInput({
  item,
  value,
  onChange,
}: {
  item: MenuItem;
  value?: number;
  onChange?: (quantity: number) => void;
}) {
  const { cartItems, addToCart, updateQuantity } = useCartContext();
  const cartItem = cartItems.find((cartItem) => cartItem.item.id === item.id);

  const amount =
    value !== undefined
      ? value
      : cartItem
      ? cartItem.quantity
      : DEFAULT_QUANTITY;

  const handleIncrement = () => {
    const newAmount = amount + 1;
    if (onChange) {
      onChange(newAmount);
    } else if (amount === 0) {
      addToCart(item, DEFAULT_QUANTITY);
    } else {
      updateQuantity(item.id, newAmount);
    }
  };

  const handleDecrement = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      if (onChange) {
        onChange(newAmount);
      } else {
        updateQuantity(item.id, newAmount);
      }
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
