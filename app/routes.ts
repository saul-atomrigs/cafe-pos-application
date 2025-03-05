import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('menu', 'features/menu/page.tsx'),
] satisfies RouteConfig;
