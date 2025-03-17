import { Box, CTAButton, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import OrderAmountInput from '~/features/cart/ui/order-amount-input';
import { useOptionsManagement } from '../hooks';
import '../styles.css';
import OptionsFallback from './fallback';
import { OptionSelection } from './select';
import { useCartContext } from '~/features/cart/context';
import { DEFAULT_QUANTITY } from '~/constants';

export default function OptionsPage() {
  const { menuItem, selectedOptions, toggleOption, totalItemPrice } =
    useOptionsManagement();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);

  if (!menuItem) return <OptionsFallback />;

  const { name, price, description, optionGroups } = menuItem;

  const handleAddToCart = () => {
    if (menuItem) {
      addToCart({ item: menuItem, quantity });
      navigate(-1);
    }
  };

  return (
    <>
      <Box>
        <Txt size='xl' weight='bold'>
          {name}
        </Txt>
        {description && <Txt color='gray'>{description}</Txt>}
        <Txt size='lg'>{krw(price)}</Txt>
      </Box>
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Txt size='lg' weight='bold'>
          총 금액
        </Txt>
        <Txt size='lg' weight='bold'>
          {krw(totalItemPrice * quantity)}
        </Txt>
        <OrderAmountInput
          item={menuItem}
          value={quantity}
          onChange={setQuantity}
        />
      </Box>

      <Box>
        <Txt size='lg' weight='bold'>
          옵션 선택
        </Txt>
        <OptionSelection
          optionGroups={optionGroups}
          selectedOptions={selectedOptions}
          onToggleOption={toggleOption}
        />
      </Box>

      <CTAButton onClick={handleAddToCart}>주문 담기</CTAButton>
    </>
  );
}
