import { CTAButton, Modal, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import { useNavigate } from 'react-router';
import { CartList } from '~/features/cart/ui/list';
import { useCartContext } from '../context';
import { useOrder } from '~/features/order/hooks';

export function CartModal() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getOrderItems, clearCart } =
    useCartContext();
  const cartTotalAmount = getCartTotal();
  const { mutateAsync: createOrder } = useOrder();

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      return;
    }

    try {
      const orderData = {
        items: getOrderItems(),
        totalAmount: getCartTotal(),
        pointsUsed: 0,
        customerPhone: undefined,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        clearCart();
        navigate('/orders');
      }
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

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
              <Txt>총액: {krw(cartTotalAmount)}</Txt>
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
