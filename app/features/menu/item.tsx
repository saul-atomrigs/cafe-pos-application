import type { MenuItem } from '~/remotes';

export interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {item.imageUrl && (
        <div style={{ position: 'relative', height: '192px', width: '100%' }}>
          <img
            src={item.imageUrl}
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
        <h3 style={{ fontWeight: '500', fontSize: '1.125rem' }}>{item.name}</h3>
        <p style={{ color: '#4a5568', marginTop: '0.5rem' }}>
          ${item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
