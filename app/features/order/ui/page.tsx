import { Error, Loading } from '@saul-atomrigs/design-system';
import { AsyncBoundary } from '@toss/async-boundary';
import { OrdersList } from './list';
import { Txt } from '../../../components/Txt';

export default function OrdersPage() {
  return (
    <div className='p-4'>
      <Txt weight='bold' size='2xl' style={{ marginBottom: '1rem' }}>
        Orders History
      </Txt>

      <AsyncBoundary
        rejectedFallback={() => <Error message='Failed to load orders' />}
        pendingFallback={<Loading message='Loading orders...' />}
      >
        <OrdersList />
      </AsyncBoundary>
    </div>
  );
}
