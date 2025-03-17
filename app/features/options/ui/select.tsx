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
      {optionGroups.map((group) => (
        <Box key={group.name}>
          <Txt>{group.name}</Txt>

          <div className='options-select'>
            {group.options.map((option) => (
              <Box
                key={option.name}
                onClick={() =>
                  onToggleOption(group.name, option.name, group.exclusive)
                }
                style={{
                  backgroundColor: selectedOptions.has(option.name)
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
                <Txt>{option.name}</Txt>
                {option.price && <Txt>{krw(option.price)}</Txt>}
              </Box>
            ))}
          </div>
        </Box>
      ))}
    </>
  );
};
