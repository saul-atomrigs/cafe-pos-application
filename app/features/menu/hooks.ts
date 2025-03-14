import { _1분, _3분 } from '@saul-atomrigs/hangeul';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMenuAPI, type Category, type MenuItem } from '~/remotes';
import { CATEGORY, KOR_CATEGORY, MENU_QUERY_KEY } from './constants';

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const useMenuQuery = () =>
  useSuspenseQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: getMenuAPI,
    gcTime: _1분,
    staleTime: _3분,
  });

export const useMenuSection = (category?: Category) => {
  const { data: menuItems } = useMenuQuery();
  const filteredItems = !category
    ? menuItems
    : menuItems.filter((item) => item.category === category);

  let title = KOR_CATEGORY.ALL;
  if (category) {
    title =
      category === CATEGORY.BEVERAGE
        ? KOR_CATEGORY.BEVERAGE
        : KOR_CATEGORY.DESSERT;
  }

  const menuSections = [{ title, items: filteredItems }];

  return { menuSections };
};
