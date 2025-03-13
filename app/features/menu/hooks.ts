import { _1분, _3분 } from '@saul-atomrigs/hangeul';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getMenuAPI } from '~/remotes';

export const MENU_QUERY_KEY = ['menu'];

export const useMenuQuery = () =>
  useSuspenseQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: getMenuAPI,
    gcTime: _1분,
    staleTime: _3분,
  });

export function useMenu() {
  const { data: menuItems } = useMenuQuery();

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
