export function List({ items }) {
  if (items.length === 0) {
    return <p>장바구니가 비어있습니다.</p>;
  }

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>장바구니 상품</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li
            key={`${item.id}-${item.options?.join('-')}`}
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
              <span style={{ fontWeight: 500 }}>{item.name}</span>
              {item.options && item.options.length > 0 && (
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#666',
                    marginTop: '0.25rem',
                  }}
                >
                  ({item.options.join(', ')})
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#666' }}>{item.quantity}개</span>
              <span style={{ fontWeight: 500 }}>
                {(item.price * item.quantity).toLocaleString()}원
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
