import { Button, Loading } from '@saul-atomrigs/design-system';
import { AsyncBoundary } from '@toss/async-boundary';
import { type MenuItem } from '~/remotes';
import { useMenu } from './hooks';
import { Error } from '~/components/Error';

export default function MenuPage() {
  return (
    <AsyncBoundary
      rejectedFallback={() => <Error message='메뉴를 불러오지 못했습니다' />}
      pendingFallback={<Loading message='메뉴를 불러오고 있습니다' />}
    >
      <Button onClick={() => console.log('clicked')}>Click me</Button>
      <MenuContent />
    </AsyncBoundary>
  );
}

function MenuContent() {
  const { getBeverages, getDesserts } = useMenu();
  const beverages = getBeverages();
  const desserts = getDesserts();

  return (
    <div>
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
          }}
        >
          Beverages
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {beverages.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
          }}
        >
          Desserts
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {desserts.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
}

function MenuItemCard({ item }: MenuItemCardProps) {
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
