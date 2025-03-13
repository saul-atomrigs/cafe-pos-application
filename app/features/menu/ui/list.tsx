import { useMenuSection } from '../hooks';
import { MenuSection } from './section';

export function List() {
  const { menuSections } = useMenuSection();

  return (
    <div className='container'>
      {menuSections.map(({ title, items }) => (
        <MenuSection key={title} title={title} items={items} />
      ))}
    </div>
  );
}
