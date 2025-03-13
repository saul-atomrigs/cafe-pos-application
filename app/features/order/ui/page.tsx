import { Error, Loading, Txt } from '@saul-atomrigs/design-system';
import { AsyncBoundary } from '@toss/async-boundary';
import { OrdersList } from './list';

export default function OrdersPage() {
  return (
    <AsyncBoundary
      rejectedFallback={() => <Error message='Failed to load orders' />}
      pendingFallback={<Loading message='Loading orders...' />}
    >
      <div className='p-4'>
        <Txt weight='bold' size='2xl' style={{ marginBottom: '1rem' }}>
          Orders History
        </Txt>
        <OrdersList />
      </div>
    </AsyncBoundary>
  );
}
