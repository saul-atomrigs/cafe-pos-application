import { Txt } from '@saul-atomrigs/design-system';
import { Item } from './item';
import type { MenuItem } from '~/remotes';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

export const MenuSection = ({ title, items }: MenuSectionProps) => (
  <>
    <Txt size='2xl' weight='semibold' style={{ marginBottom: '1rem' }}>
      {title}
    </Txt>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  </>
);
