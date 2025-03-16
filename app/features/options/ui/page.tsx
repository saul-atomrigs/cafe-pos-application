import { Box, CTAButton, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';
import { useNavigate } from 'react-router';
import OrderAmountInput from '~/features/cart/ui/order-amount-input';
import { useOptionsManagement } from '../hooks';
import '../styles.css';
import OptionsFallback from './fallback';
import { OptionSelection } from './select';

export default function OptionsPage() {
  const { menuItem, selectedOptions, toggleOption, totalItemPrice } =
    useOptionsManagement();
  const navigate = useNavigate();

  if (!menuItem) return <OptionsFallback />;

  const { name, price, description, option } = menuItem;

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
          {krw(totalItemPrice)}
        </Txt>
        <OrderAmountInput item={menuItem} />
      </Box>

      <OptionSelection
        options={option}
        selectedOptions={selectedOptions}
        onToggleOption={toggleOption}
      />

      <CTAButton onClick={() => navigate(-1)}>주문 담기</CTAButton>
    </>
  );
}
