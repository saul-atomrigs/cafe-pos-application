import { Box, Txt, Button } from '@saul-atomrigs/design-system';
import type { MenuItem } from '~/remotes';
import { useCartContext } from '~/features/cart/context';
import '../styles.css';

export function Item({ item }: { item: MenuItem }) {
  const { name, price, image } = item;
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
    <Box>
      {item.image && (
        <div className='menuItem__imageContainer'>
          <img src={image} alt={name} className='menuItem__image' />
        </div>
      )}
      <div className='menuItem__content'>
        <div className='menuItem__topRow'>
          <div className='menuItem__info'>
            <Txt weight='medium' size='lg'>
              {name}
            </Txt>
            <Txt size='base'>{price}원</Txt>
          </div>
          <div className='menuItem__amountControl'>
            <Button
              variant='secondary'
              onClick={handleDecrement}
              disabled={amount === 0}
            >
              -
            </Button>
            <Txt size='base'>{amount}</Txt>
            <Button variant='primary' onClick={handleIncrement}>
              +
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
