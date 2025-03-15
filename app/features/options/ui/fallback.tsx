import { Box, Button, Txt } from '@saul-atomrigs/design-system';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/routes';

export default function OptionsFallback() {
  const navigate = useNavigate();

  return (
    <Box>
      <Txt>메뉴를 찾을 수 없습니다.</Txt>
      <Button onClick={() => navigate(ROUTES.MENU)}>메뉴로 돌아가기</Button>
    </Box>
  );
}
