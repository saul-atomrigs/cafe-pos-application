import {
  Button,
  DualCTAButton,
  Error,
  Loading,
  Txt,
} from '@saul-atomrigs/design-system';
import { AsyncBoundary } from '@toss/async-boundary';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes';
import { useOrderContext } from '../order/context';

export default function StartPage() {
  const navigate = useNavigate();
  const { setOrderType } = useOrderContext();

  const handleClickInStore = () => {
    setOrderType('in-store');
    navigate(ROUTES.MENU);
  };

  const handleClickTakeOut = () => {
    setOrderType('take-out');
    navigate(ROUTES.MENU);
  };

  return (
    <AsyncBoundary
      rejectedFallback={() => (
        <Error message='시작 화면을 불러오지 못했습니다' />
      )}
      pendingFallback={<Loading message='시작 화면을 불러오고 있습니다' />}
    >
      <div className='container'>
        <Txt size='xl' weight='bold'>
          POS에 오신걸 환영합니다
        </Txt>

        <DualCTAButton>
          <Button onClick={handleClickInStore}>매장(다회용컵)</Button>
          <Button onClick={handleClickTakeOut}>포장(일회용컵)</Button>
        </DualCTAButton>
      </div>
    </AsyncBoundary>
  );
}
