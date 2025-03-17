import { Box, List, Txt } from '@saul-atomrigs/design-system';
import { format } from 'date-fns';
import { useGetOrders } from '../hooks';
import { krw } from '@saul-atomrigs/hangeul';

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
          <Box key={orderId}>
            <List direction='horizontal'>
              <Txt weight='bold' size='lg'>
                주문번호: {orderId}
              </Txt>
              <Txt color='#6b7280'>
                {format(new Date(timestamp), 'MMM dd, yyyy HH:mm')}
              </Txt>
            </List>

            <List direction='horizontal'>
              <Txt weight='medium'>총 금액:</Txt> {krw(totalAmount)}
              {customerPhone && (
                <>
                  <Txt weight='medium'>Customer:</Txt> {customerPhone}
                </>
              )}
              <>
                <Txt weight='medium'>Points:</Txt>
                {pointsUsed > 0 ? ` Used ${pointsUsed}` : ''}
                {pointsEarned > 0 ? ` | Earned ${pointsEarned}` : ''}
              </>
            </List>

            <div>
              <Txt weight='medium' style={{ marginBottom: '0.25rem' }}>
                주문 내역:
              </Txt>
              <List direction='vertical'>
                {items.map((item, idx) => (
                  <Box key={idx}>
                    <Txt size='sm' color='#374151'>
                      {krw(item.quantity * item.unitPrice)} -{item.menuItemId} x
                      {item.quantity}
                    </Txt>
                  </Box>
                ))}
              </List>
            </div>
          </Box>
        )
      )}
    </List>
  );
}
