import { CTAButton, Txt } from '@saul-atomrigs/design-system';
import { useNavigate } from 'react-router';

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <Txt size='xl' weight='bold'>
        POS에 오신걸 환영합니다
      </Txt>

      <CTAButton onClick={() => navigate('/menu')}>메뉴로 이동하기</CTAButton>
    </div>
  );
}
