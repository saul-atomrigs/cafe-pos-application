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

export const useMenuSection = () => {
  const { data: menuItems } = useMenuQuery();
  const menuSections = [
    {
      title: '음료',
      items: menuItems.filter((item) => item.category === 'beverage'),
    },
    {
      title: '디저트',
      items: menuItems.filter((item) => item.category === 'dessert'),
    },
  ];

  return { menuSections };
};
