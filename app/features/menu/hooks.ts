import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { type MenuItem, getMenuAPI } from '~/remotes';

export const menuQueryKey = ['menu'];

export function useMenu() {
  const { data: menuItems } = useSuspenseQuery<MenuItem[]>({
    queryKey: menuQueryKey,
    queryFn: getMenuAPI,
  });

  const beverages = menuItems.filter((item) => item.category === 'beverage');
  const desserts = menuItems.filter((item) => item.category === 'dessert');

  const getMenuItem = useCallback(
    (id: string) => menuItems.find((item) => item.id === id),
    [menuItems]
  );

  return {
    menuItems,
    beverages,
    desserts,
    getMenuItem,
  };
}
