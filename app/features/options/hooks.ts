import { useState } from 'react';
import type { MenuItem } from '~/remotes';

export function useOptions(menuItem: MenuItem) {
  const [selectedOptions, setSelectedOptions] = useState(new Set());

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
    menuItem?.optionGroups?.reduce((sum, group) => {
      return group.options.reduce((groupSum, option) => {
        if (selectedOptions.has(option.name) && option.price) {
          return groupSum + option.price;
        }
        return groupSum;
      }, sum);
    }, 0) || 0;

  const totalItemPrice = menuItem ? menuItem.price + optionPrice : 0;

  return {
    menuItem,
    selectedOptions,
    toggleOption,
    totalItemPrice,
  };
}
