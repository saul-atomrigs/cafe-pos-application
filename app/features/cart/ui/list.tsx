import { krw } from '@saul-atomrigs/hangeul';

export function List({ items }) {
  if (items.length === 0) {
    return <p>장바구니가 비어있습니다.</p>;
  }

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>장바구니 상품</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((cartItem, index) => {
          const { item, quantity, options } = cartItem;
          const { id, name, price } = item;

          return (
            <li
              key={`${id}-${options?.join('-') || ''}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 0',
                borderBottom:
                  index === items.length - 1 ? 'none' : '1px solid #eee',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 500 }}>{name}</span>
                {options && options.length > 0 && (
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      marginTop: '0.25rem',
                    }}
                  >
                    ({options.join(', ')})
                  </span>
                )}
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <span style={{ color: '#666' }}>{quantity}개</span>
                <span style={{ fontWeight: 500 }}>{krw(price * quantity)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
