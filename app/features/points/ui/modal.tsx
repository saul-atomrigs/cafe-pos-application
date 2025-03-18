import { Button, Modal } from '@saul-atomrigs/design-system';
import { PointsInput } from './input';

interface PointsModalProps {
  onConfirm: () => void;
}

export const PointsModal = ({ onConfirm }: PointsModalProps) => {
  return (
    <Modal.Provider title='포인트 적용'>
      <Modal.Trigger>
        <Button>포인트 사용</Button>
      </Modal.Trigger>
      <Modal.Content>
        <PointsInput />
        <Button onClick={onConfirm}>확인</Button>
      </Modal.Content>
    </Modal.Provider>
  );
};
