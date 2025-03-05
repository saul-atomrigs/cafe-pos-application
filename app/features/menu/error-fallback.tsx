import { Error } from '~/components/Error';

export function ErrorFallback({ error }: { error: Error }) {
  return <Error message={error.message || 'Failed to load menu items'} />;
}
