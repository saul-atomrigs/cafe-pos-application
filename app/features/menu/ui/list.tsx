import { useMenu } from '../hooks';
import { MenuSection } from './section';

export function List() {
  const { beverages, desserts } = useMenu();
  const menuSections = [
    { title: '음료', items: beverages },
    { title: '디저트', items: desserts },
  ];

  return (
    <div className='container'>
      {menuSections.map((section) => (
        <MenuSection
          key={section.title}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  );
}
