import { useState, type ChangeEventHandler } from 'react';
import { Modal, TextInput, Txt } from '@saul-atomrigs/design-system';
import { useCartContext } from '~/features/cart/context';
import { PHONE_NUMBER_LENGTH, PHONE_REGEX } from '../constants';

export function PointsInput() {
  const [phone, setPhone] = useState('');
  const { updateCustomerPhone } = useCartContext();

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (PHONE_REGEX.test(value) && value.length <= PHONE_NUMBER_LENGTH) {
      setPhone(value);
      updateCustomerPhone(value || undefined);
    }
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Txt style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
        포인트 적립할 전화번호를 입력해주세요
      </Txt>
      <TextInput
        name='phone'
        value={phone}
        onChange={handlePhoneChange}
        placeholder='- 없이 입력해주세요'
        type='text'
      />
    </div>
  );
}
