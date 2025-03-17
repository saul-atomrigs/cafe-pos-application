import { Box, List, Txt } from '@saul-atomrigs/design-system';
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
              <Txt weight='bold' size='lg'>
                Order #{orderId.substring(0, 8)}
              </Txt>
              <Txt color='#6b7280'>
                {format(new Date(timestamp), 'MMM dd, yyyy HH:mm')}
              </Txt>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <Txt>
                <Txt weight='medium' style={{ display: 'inline' }}>
                  Total:
                </Txt>{' '}
                ${totalAmount.toFixed(2)}
              </Txt>
              {customerPhone && (
                <Txt>
                  <Txt weight='medium' style={{ display: 'inline' }}>
                    Customer:
                  </Txt>{' '}
                  {customerPhone}
                </Txt>
              )}
              <Txt>
                <Txt weight='medium' style={{ display: 'inline' }}>
                  Points:
                </Txt>
                {pointsUsed > 0 ? ` Used ${pointsUsed}` : ''}
                {pointsEarned > 0 ? ` | Earned ${pointsEarned}` : ''}
              </Txt>
            </div>

            <div>
              <Txt weight='medium' style={{ marginBottom: '0.25rem' }}>
                Items:
              </Txt>
              <ul style={{ fontSize: '0.875rem', color: '#374151' }}>
                {items.map((item, idx) => (
                  <li key={idx}>
                    <Txt
                      size='sm'
                      color='#374151'
                      style={{ display: 'inline' }}
                    >
                      {item.name} x{item.quantity} - $
                      {(item.quantity * item.unitPrice).toFixed(2)}
                    </Txt>
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
