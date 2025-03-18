import { Button, CTAButton, Modal } from '@saul-atomrigs/design-system';
import { PointsInput } from './input';

interface PointsModalProps {
  onConfirm: () => void;
}

export const PointsModal = ({ onConfirm }: PointsModalProps) => {
  return (
    <Modal.Provider title='포인트 적용'>
      <Modal.Trigger>
        <CTAButton>포인트 사용</CTAButton>
      </Modal.Trigger>
      <Modal.Content>
        <PointsInput />
        <Button onClick={onConfirm}>확인</Button>
      </Modal.Content>
    </Modal.Provider>
  );
};
