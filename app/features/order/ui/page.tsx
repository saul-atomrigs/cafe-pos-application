import { CTAButton, Error, Loading, Txt } from '@saul-atomrigs/design-system';
import { AsyncBoundary } from '@toss/async-boundary';
import { OrdersList } from './list';
import { ROUTES } from '~/routes';
import { useNavigate } from 'react-router';

export default function OrdersPage() {
  const navigate = useNavigate();
  return (
    <AsyncBoundary
      rejectedFallback={() => <Error message='Failed to load orders' />}
      pendingFallback={<Loading message='Loading orders...' />}
    >
      <Txt weight='bold' size='2xl' style={{ marginBottom: '1rem' }}>
        주문 내역
      </Txt>
      <OrdersList />
      <CTAButton onClick={() => navigate(ROUTES.MENU)}>
        메뉴로 돌아가기
      </CTAButton>
    </AsyncBoundary>
  );
}
