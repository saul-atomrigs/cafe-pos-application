import { CTAButton, Modal, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import { useCartContext } from '../context';
import { useCartModal } from '../hooks';
import { CartList } from './list';

export function CartModal() {
  const { cartItems, cartTotalAmount } = useCartContext();
  const { handleOrder } = useCartModal();

  return (
    <Modal.Provider title='주문 확인'>
      <Modal.Trigger disabled={cartItems.length === 0}>
        <CTAButton disabled={cartItems.length === 0}>주문하기</CTAButton>
      </Modal.Trigger>
      <Modal.Content>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '300px',
          }}
        >
          <div
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              marginBottom: '1rem',
            }}
          >
            <CartList items={cartItems} />
            <div
              style={{
                fontWeight: 'bold',
                textAlign: 'right',
                marginTop: '1rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid #eee',
              }}
            >
              <Txt weight='bold'>총액: {krw(cartTotalAmount)}</Txt>
              <Txt size='xs'>적립 포인트: {krw(cartTotalAmount / 100)}</Txt>
            </div>
          </div>
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '1rem',
              borderTop: '1px solid #eee',
            }}
          >
            <Modal.CTAButton onClick={handleOrder}>
              주문 완료하기
            </Modal.CTAButton>
          </div>
        </div>
      </Modal.Content>
    </Modal.Provider>
  );
}
