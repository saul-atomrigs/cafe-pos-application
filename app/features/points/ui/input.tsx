import { useState } from 'react';
import { TextInput, Txt } from '@saul-atomrigs/design-system';
import { useCartContext } from '~/features/cart/context';
import { PHONE_NUMBER_LENGTH, PHONE_REGEX } from '../constants';

export function PointsInput() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const { updateCustomerPhone } = useCartContext();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (PHONE_REGEX.test(value) && value.length <= PHONE_NUMBER_LENGTH) {
      setPhoneNumber(value);
      updateCustomerPhone(value || undefined);
    }
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Txt style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
        포인트 적립
      </Txt>
      <TextInput
        name='포인트'
        placeholder='전화번호 입력 (포인트 적립)'
        value={phoneNumber}
        onChange={handlePhoneChange}
        style={{ width: '100%' }}
      />
    </div>
  );
}
