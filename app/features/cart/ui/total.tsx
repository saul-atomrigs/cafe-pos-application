import { Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import { useCartContext } from '../context';

export const CartTotal = () => {
  const { cartTotalAmount } = useCartContext();

  return (
    <div
      style={{
        textAlign: 'right',
        marginTop: '1rem',
        paddingTop: '0.5rem',
        borderTop: '1px solid #eee',
      }}
    >
      <Txt weight='bold'>총액: {krw(cartTotalAmount)}</Txt>
      <Txt size='xs'>적립 포인트: {krw(cartTotalAmount / 100)}</Txt>
    </div>
  );
};
