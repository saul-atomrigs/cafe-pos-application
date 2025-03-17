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
    <>
      {options.map(({ name, price }) => (
        <Box
          key={name}
          onClick={() => onToggleOption(name)}
          style={{
            backgroundColor: selectedOptions.has(name)
              ? '#f0f0f0'
              : 'transparent',
          }}
        >
          <Txt>{name}</Txt>
          {price && <Txt>{krw(price)}</Txt>}
        </Box>
      ))}
    </>
  );
};
