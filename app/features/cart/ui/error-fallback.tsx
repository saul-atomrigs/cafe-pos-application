import { Button } from '@saul-atomrigs/design-system';
import { type FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes';

export const CartErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate(ROUTES.MENU);
  };

  return (
    <div className='cart-error-container'>
      <h3>주문 처리 중 문제가 발생했습니다</h3>
      <p>{error.message}</p>
      <div className='cart-error-actions'>
        <Button onClick={resetErrorBoundary}>다시 시도하기</Button>
        <Button variant='secondary' onClick={handleGoToHome}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};
