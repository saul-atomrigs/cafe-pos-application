import { Box, List } from '@saul-atomrigs/design-system';
import { format } from 'date-fns';
import { useGetOrders } from '../hooks';

export function OrdersList() {
  const { data: orders } = useGetOrders();

  return (
    <List direction='vertical'>
      {orders?.map(
        ({
          id: orderId,
          timestamp,
          totalAmount,
          customerPhone,
          pointsUsed,
          pointsEarned,
          items,
        }) => (
          <Box
            key={orderId}
            padding='1rem'
            style={{
              border: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}
            >
              <h2 style={{ fontWeight: 600 }}>
                Order #{orderId.substring(0, 8)}
              </h2>
              <span style={{ color: '#6b7280' }}>
                {format(new Date(timestamp), 'MMM dd, yyyy HH:mm')}
              </span>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <p>
                <span style={{ fontWeight: 500 }}>Total:</span> $
                {totalAmount.toFixed(2)}
              </p>
              {customerPhone && (
                <p>
                  <span style={{ fontWeight: 500 }}>Customer:</span>{' '}
                  {customerPhone}
                </p>
              )}
              <p>
                <span style={{ fontWeight: 500 }}>Points:</span>
                {pointsUsed > 0 ? ` Used ${pointsUsed}` : ''}
                {pointsEarned > 0 ? ` | Earned ${pointsEarned}` : ''}
              </p>
            </div>

            <div>
              <h3 style={{ fontWeight: 500, marginBottom: '0.25rem' }}>
                Items:
              </h3>
              <ul style={{ fontSize: '0.875rem', color: '#374151' }}>
                {items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x{item.quantity} - $
                    {(item.quantity * item.unitPrice).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        )
      )}
    </List>
  );
}
