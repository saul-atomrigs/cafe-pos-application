import { type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { CartErrorFallback } from './error-fallback';

interface CartErrorBoundaryProps extends PropsWithChildren {
  onReset?: () => void;
}

export const CartErrorBoundary = ({
  children,
  onReset,
}: CartErrorBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={CartErrorFallback} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
};
