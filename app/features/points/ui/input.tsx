import { TextInput, Txt } from '@saul-atomrigs/design-system';
import { type ChangeEventHandler } from 'react';
import { useCartContext } from '~/features/cart/context';
import { PHONE_NUMBER_LENGTH, PHONE_REGEX } from '../constants';

export function PointsInput() {
  const { customerPhone, updateCustomerPhone } = useCartContext();

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (PHONE_REGEX.test(value) && value.length <= PHONE_NUMBER_LENGTH) {
      updateCustomerPhone(value);
    }
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Txt>포인트 적립할 전화번호를 입력해주세요</Txt>
      <TextInput
        name='phone'
        value={customerPhone ?? ''}
        onChange={handlePhoneChange}
        placeholder='- 없이 입력해주세요'
      />
    </div>
  );
}
