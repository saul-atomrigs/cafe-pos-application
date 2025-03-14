import type { Category } from '~/remotes';
import { useMenuSection } from '../hooks';
import { MenuSection } from './section';
import { Tabs } from '@saul-atomrigs/design-system';

interface MenuListContentProps {
  category: Category;
}
function MenuListContent({ category }: MenuListContentProps) {
  const { menuSections } = useMenuSection(category);

  return (
    <div className='container'>
      {menuSections.map(({ title, items }) => (
        <MenuSection key={title} title={title} items={items} />
      ))}
    </div>
  );
}

const tabs = [
  { label: '음료', content: <MenuListContent category='beverage' /> },
  { label: '디저트', content: <MenuListContent category='dessert' /> },
];

export function MenuList() {
  return (
    <Tabs tabs={tabs}>
      <Tabs.Trigger />
      <Tabs.Content />
    </Tabs>
  );
}
