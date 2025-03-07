import { Box, Txt } from '@saul-atomrigs/design-system';
import OrderAmountInput from '~/features/cart/ui/order-amount-input';
import type { MenuItem } from '~/remotes';
import '../styles.css';

export function Item({ item }: { item: MenuItem }) {
  const { name, price, image } = item;

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
            <OrderAmountInput item={item} />
          </div>
        </div>
      </div>
    </Box>
  );
}
