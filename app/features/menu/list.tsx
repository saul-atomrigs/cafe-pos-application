import { Box, Txt } from '@saul-atomrigs/design-system';
import { useMenu } from './hooks';
import { MenuItemCard } from './item';

export function MenuContent() {
  const { getBeverages, getDesserts } = useMenu();
  const beverages = getBeverages();
  const desserts = getDesserts();

  return (
    <>
      <Txt size='2xl' weight='semibold' style={{ marginBottom: '1rem' }}>
        음료
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

      <Txt size='2xl' weight='semibold' style={{ marginBottom: '1rem' }}>
        디저트
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
    </>
  );
}
