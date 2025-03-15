import { Box, Button, Txt } from '@saul-atomrigs/design-system';
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
        <Box>
          <Txt size='xl' weight='bold'>
            {name}
          </Txt>
          <Txt size='lg'>{krw(price)}</Txt>
          {description && <Txt color='gray'>{description}</Txt>}
        </Box>
      </Box>

      <OptionSelection
        options={option}
        selectedOptions={selectedOptions}
        onToggleOption={toggleOption}
      />

      <Box>
        <OrderAmountInput item={menuItem} />

        <Box>
          <Txt size='lg' weight='bold'>
            총 금액
          </Txt>
          <Txt size='lg' weight='bold'>
            {krw(totalItemPrice)}
          </Txt>
        </Box>

        <Button onClick={() => navigate(-1)} variant='primary'>
          장바구니에 담기
        </Button>
      </Box>
    </>
  );
}
