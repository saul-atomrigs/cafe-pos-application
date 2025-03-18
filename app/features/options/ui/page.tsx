import { Box, CTAButton, List, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import OrderAmountInput from '~/features/cart/ui/order-amount-input';
import { useOptions } from '../hooks';
import '../styles.css';
import OptionsFallback from './fallback';
import { OptionSelection } from './select';
import { useCartContext } from '~/features/cart/context';
import { DEFAULT_QUANTITY } from '~/constants';
import { useMenuItemContext } from '~/features/menu/context';

export default function OptionsPage() {
  const { id = '' } = useParams();
  const menuItem = useMenuItemContext(id);
  const { selectedOptions, toggleOption, totalItemPrice } =
    useOptions(menuItem);
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);

  if (!menuItem) return <OptionsFallback />;

  const { name, price, description, optionGroups } = menuItem;

  const handleAddToCart = () => {
    if (menuItem) {
      addToCart({
        item: menuItem,
        quantity,
        selectedOptions: selectedOptions.size > 0 ? selectedOptions : undefined,
      });
      navigate(-1);
    }
  };

  return (
    <>
      <div className='container'>
        <List direction='vertical'>
          <Txt size='xl' weight='bold'>
            {name}
          </Txt>
          {description && <Txt color='gray'>{description}</Txt>}
        </List>
      </div>
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

      <div className='container'>
        <List direction='vertical'>
          <Txt size='lg' weight='bold'>
            옵션 선택
          </Txt>
          <OptionSelection
            optionGroups={optionGroups}
            selectedOptions={selectedOptions}
            onToggleOption={toggleOption}
          />
        </List>
      </div>
      <CTAButton onClick={handleAddToCart}>주문 담기</CTAButton>
    </>
  );
}
