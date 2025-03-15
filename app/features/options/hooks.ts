import { useState } from 'react';
import { useParams } from 'react-router';
import { useMenuItemContext } from '../menu/context';

export function useOptionsManagement() {
  const { id } = useParams<{ id: string }>();
  const menuItem = useMenuItemContext(id || '');
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );

  const toggleOption = (optionName: string) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (selectedOptions.has(optionName)) {
      newSelectedOptions.delete(optionName);
    } else {
      newSelectedOptions.add(optionName);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const optionPrice =
    menuItem?.option?.reduce((sum, option) => {
      if (selectedOptions.has(option.name) && option.price) {
        return sum + option.price;
      }
      return sum;
    }, 0) || 0;

  const totalItemPrice = menuItem ? menuItem.price + optionPrice : 0;

  return {
    menuItem,
    selectedOptions,
    toggleOption,
    totalItemPrice,
  };
}
