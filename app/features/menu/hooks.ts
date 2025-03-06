import { useSuspenseQuery } from '@tanstack/react-query';
import { type MenuItem, getMenuAPI } from '~/remotes';

export const menuQueryKey = ['menu'];

export function useMenu() {
  const { data: menuItems } = useSuspenseQuery<MenuItem[]>({
    queryKey: menuQueryKey,
    queryFn: getMenuAPI,
  });

  const getBeverages = () =>
    menuItems.filter((item) => item.category === 'beverage');
  const beverages = getBeverages();
  const getDesserts = () =>
    menuItems.filter((item) => item.category === 'dessert');
  const desserts = getDesserts();

  const getMenuItem = (id: string) => menuItems.find((item) => item.id === id);

  return {
    menuItems,
    beverages,
    desserts,
    getMenuItem,
  };
}
