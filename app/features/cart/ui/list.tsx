import { List, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import type { CartItem } from '../context';

export function CartList({ items }: { items: CartItem[] }) {
  if (items.length === 0) {
    return <p>장바구니가 비어있습니다.</p>;
  }

  return (
    <List direction='vertical'>
      {items.map((cartItem) => {
        const { item, quantity } = cartItem;
        const { id, name, price } = item;

        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Txt size='base' weight='normal'>
              {name}
            </Txt>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Txt style={{ color: '#666' }}>{quantity}개</Txt>
              <Txt style={{ fontWeight: 500 }}>{krw(price * quantity)}</Txt>
            </div>
          </div>
        );
      })}
    </List>
  );
}
