import { useState } from 'react';
import type { MenuItem } from '~/remotes';

export function useOptions(menuItem: MenuItem) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );

  const toggleOption = (
    groupName: string,
    optionName: string,
    isExclusive: boolean
  ) => {
    const newSelectedOptions = new Set(selectedOptions);

    if (isExclusive) {
      menuItem?.optionGroups
        ?.find((group) => group.name === groupName)
        ?.options.forEach((option) => {
          if (option.name !== optionName) {
            newSelectedOptions.delete(option.name);
          }
        });
    }

    if (selectedOptions.has(optionName)) {
      newSelectedOptions.delete(optionName);
    } else {
      newSelectedOptions.add(optionName);
    }

    setSelectedOptions(newSelectedOptions);
  };

  const optionPrice =
    menuItem?.optionGroups
      ?.flatMap((group) => group.options)
      .filter((option) => selectedOptions.has(option.name) && option.price)
      .reduce((sum, option) => sum + (option.price || 0), 0) || 0;

  const totalItemPrice = menuItem ? menuItem.price + optionPrice : 0;

  return {
    menuItem,
    selectedOptions,
    toggleOption,
    totalItemPrice,
  };
}
