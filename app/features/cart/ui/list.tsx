import { List, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import type { CartItem } from '../context';
import OrderAmountInput from './order-amount-input';

export function CartList({ items }: { items: CartItem[] }) {
  if (items.length === 0) {
    return <p>장바구니가 비어있습니다.</p>;
  }

  // Helper function to calculate total item price including options
  const calculateItemPrice = (cartItem: CartItem) => {
    const { item, selectedOptions } = cartItem;
    let totalPrice = item.price;

    if (selectedOptions && item.optionGroups) {
      item.optionGroups.forEach((group) => {
        group.options.forEach((option) => {
          if (selectedOptions.has(option.name) && option.price) {
            totalPrice += option.price;
          }
        });
      });
    }

    return totalPrice;
  };

  return (
    <List direction='vertical'>
      {items.map((cartItem) => {
        const { item, quantity, selectedOptions } = cartItem;
        const { id, name } = item;
        const itemTotalPrice = calculateItemPrice(cartItem) * quantity;

        return (
          <div
            key={`${id}-${Array.from(selectedOptions || []).join('-')}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Txt size='base' weight='normal'>
                {name}
              </Txt>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <Txt style={{ color: '#666' }}>{quantity}개</Txt>
                <Txt style={{ fontWeight: 500 }}>{krw(itemTotalPrice)}</Txt>
              </div>
              <OrderAmountInput item={item} />
            </div>

            {selectedOptions && selectedOptions.size > 0 && (
              <div style={{ paddingLeft: '12px', marginTop: '4px' }}>
                {Array.from(selectedOptions).map((optionName) => (
                  <Txt key={optionName} size='sm' color='gray'>
                    + {optionName}
                  </Txt>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </List>
  );
}
