import { CTAButton, Error, Loading, Txt } from '@saul-atomrigs/design-system';
import { AsyncBoundary } from '@toss/async-boundary';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes';

export default function StartPage() {
  const navigate = useNavigate();

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

        <CTAButton onClick={() => navigate(ROUTES.MENU)}>
          메뉴로 이동하기
        </CTAButton>
      </div>
    </AsyncBoundary>
  );
}
