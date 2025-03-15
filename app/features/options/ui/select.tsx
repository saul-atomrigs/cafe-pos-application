import { Box, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';

interface OptionSelectionProps {
  options?: { name: string; price?: number }[];
  selectedOptions: Set<string>;
  onToggleOption: (optionName: string) => void;
}

export const OptionSelection = ({
  options,
  selectedOptions,
  onToggleOption,
}: OptionSelectionProps) => {
  if (!options || options.length === 0) {
    return <Txt>옵션이 없습니다.</Txt>;
  }

  return (
    <Box>
      <Txt size='lg' weight='bold'>
        옵션 선택
      </Txt>
      {options.map((option) => (
        <Box key={option.name} onClick={() => onToggleOption(option.name)}>
          <Txt>{option.name}</Txt>
          {option.price && <Txt>{krw(option.price)}</Txt>}
        </Box>
      ))}
    </Box>
  );
};
