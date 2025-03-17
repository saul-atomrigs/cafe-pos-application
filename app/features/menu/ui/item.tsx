import { useNavigate } from 'react-router';
import { Box, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import type { MenuItem } from '~/remotes';
import { ROUTES } from '~/routes';
import '../styles.css';
import { useCartContext } from '~/features/cart/context';
import { DEFAULT_QUANTITY } from '~/constants';

export function Item({ item }: { item: MenuItem }) {
  const navigate = useNavigate();
  const { addToCart } = useCartContext();

  const { id, name, price, image, option } = item;

  return (
    <Box
      onClick={() => {
        option
          ? navigate(ROUTES.OPTION_DETAIL(id))
          : addToCart({ item, quantity: DEFAULT_QUANTITY });
      }}
    >
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
            <Txt size='base'>{krw(price)}</Txt>
          </div>
        </div>
      </div>
    </Box>
  );
}
