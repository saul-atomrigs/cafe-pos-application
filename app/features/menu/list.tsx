import { useMenu } from './hooks';
import { MenuItemCard } from './item';
import { Box, Txt } from '@saul-atomrigs/design-system';

export function MenuContent() {
  const { getBeverages, getDesserts } = useMenu();
  const beverages = getBeverages();
  const desserts = getDesserts();

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <Txt size='2xl' weight='semibold' style={{ marginBottom: '1rem' }}>
          Beverages
        </Txt>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            boxShadow: 'none',
            padding: 0,
          }}
        >
          {beverages.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </Box>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Txt size='2xl' weight='semibold' style={{ marginBottom: '1rem' }}>
          Desserts
        </Txt>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            boxShadow: 'none',
            padding: 0,
          }}
        >
          {desserts.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </Box>
      </section>
    </div>
  );
}
