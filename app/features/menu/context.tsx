import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { type MenuItem, type Category } from '~/remotes';
import { useMenuQuery } from './hooks';
import { CATEGORY, KOR_CATEGORY } from './constants';

interface MenuContextType {
  menuItems: MenuItem[];
  getItemById: (id: string) => MenuItem;
  getMenuItemsByCategory: (category?: Category) => MenuItem[];
  getCategoryTitle: (category?: Category) => string;
  categories: Category[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: PropsWithChildren) {
  const { data: menuItems } = useMenuQuery();

  const contextValue = useMemo(() => {
    const getItemById = (id: string) => {
      const item = menuItems.find((item) => item.id === id);
      if (!item) throw new Error(`Menu item with id ${id} not found`);
      return item;
    };

    const getMenuItemsByCategory = (category?: Category) => {
      if (!category) return menuItems;
      return menuItems.filter((item) => item.category === category);
    };

    const getCategoryTitle = (category?: Category) => {
      if (!category) return KOR_CATEGORY.ALL;
      return category === CATEGORY.BEVERAGE
        ? KOR_CATEGORY.BEVERAGE
        : KOR_CATEGORY.DESSERT;
    };

    // Extract unique categories from menu items
    const categories = Array.from(
      new Set(menuItems.map((item) => item.category))
    ) as Category[];

    return {
      menuItems,
      getItemById,
      getMenuItemsByCategory,
      getCategoryTitle,
      categories,
    };
  }, [menuItems]);

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error(
      'useMenuContext는 MenuProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
}

export function useMenuItemContext(id: string) {
  const { getItemById } = useMenuContext();
  return useMemo(() => getItemById(id), [getItemById, id]);
}
