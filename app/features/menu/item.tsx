import { Box, Txt } from '@saul-atomrigs/design-system';
import type { MenuItem } from '~/remotes';
import './styles.css';

export function Item({ item }: { item: MenuItem }) {
  return (
    <Box>
      {item.image && (
        <div className='menuItem__imageContainer'>
          <img src={item.image} alt={item.name} className='menuItem__image' />
        </div>
      )}
      <div className='menuItem__content'>
        <Txt weight='medium' size='lg'>
          {item.name}
        </Txt>
        <Txt size='base'>{item.price}원</Txt>
      </div>
    </Box>
  );
}
