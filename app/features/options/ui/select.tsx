import { Box, Txt } from '@saul-atomrigs/design-system';
import { krw } from '@saul-atomrigs/hangeul';

interface OptionSelectionProps {
  optionGroups?: {
    name: string;
    exclusive: boolean;
    options: { name: string; price?: number }[];
  }[];
  selectedOptions: Set<string>;
  onToggleOption: (
    groupName: string,
    optionName: string,
    isExclusive: boolean
  ) => void;
}

export const OptionSelection = ({
  optionGroups,
  selectedOptions,
  onToggleOption,
}: OptionSelectionProps) => {
  if (!optionGroups || optionGroups.length === 0) {
    return <Txt>옵션이 없습니다.</Txt>;
  }

  return (
    <>
      {optionGroups.map(({ name: groupName, exclusive, options }) => (
        <div key={groupName} className='options-select'>
          {options.map(({ name: optionName, price }) => (
            <Box
              key={optionName}
              onClick={() => onToggleOption(groupName, optionName, exclusive)}
              style={{
                backgroundColor: selectedOptions.has(optionName)
                  ? '#f0f0f0'
                  : 'transparent',
                padding: '8px',
                margin: '4px 0',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Txt>{optionName}</Txt>
              {price && <Txt>{krw(price)}</Txt>}
            </Box>
          ))}
        </div>
      ))}
    </>
  );
};
