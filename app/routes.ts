import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('features/start/page.tsx'),
  route('menu', 'features/menu/page.tsx'),
] satisfies RouteConfig;
