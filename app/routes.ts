import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('features/start/page.tsx'),
  route('menu', 'features/menu/ui/page.tsx'),
  route('orders', 'features/order/ui/page.tsx'),
] satisfies RouteConfig;

export const ROUTES = {
  START: '/',
  MENU: '/menu',
};
