import { CTAButton, Error, Loading } from '@saul-atomrigs/design-system';
import { AsyncBoundary } from '@toss/async-boundary';
import { List } from './list';

export default function MenuPage() {
  return (
    <AsyncBoundary
      rejectedFallback={() => <Error message='메뉴를 불러오지 못했습니다' />}
      pendingFallback={<Loading message='메뉴를 불러오고 있습니다' />}
    >
      <List />
      <CTAButton>주문하기</CTAButton>
    </AsyncBoundary>
  );
}
