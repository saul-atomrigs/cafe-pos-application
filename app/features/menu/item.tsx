import { Box, Txt } from '@saul-atomrigs/design-system';
import type { MenuItem } from '~/remotes';

export function Item({ item }: { item: MenuItem }) {
  return (
    <Box
      style={{
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {item.image && (
        <div style={{ position: 'relative', height: '192px', width: '100%' }}>
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}
      <div style={{ padding: '1rem' }}>
        <Txt weight='medium' size='lg'>
          {item.name}
        </Txt>
        <Txt size='base' style={{ color: '#4a5568', marginTop: '0.5rem' }}>
          {item.price}원
        </Txt>
      </div>
    </Box>
  );
}
