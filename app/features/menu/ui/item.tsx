import { Box, Txt, Button } from '@saul-atomrigs/design-system';
import { useState } from 'react';
import type { MenuItem } from '~/remotes';
import '../styles.css';

export function Item({ item }: { item: MenuItem }) {
  const { name, price, image } = item;
  const [amount, setAmount] = useState(0);

  const handleIncrement = () => setAmount((prev) => prev + 1);
  const handleDecrement = () => setAmount(prev > 0 ? prev - 1 : 0);

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
