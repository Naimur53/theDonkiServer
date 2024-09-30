import express from 'express';
import { AiConfigRoutes } from '../modules/aiConfig/aiConfig.router';
import { AuthRoutes } from '../modules/auth/auth.route';
import { InfoRoutes } from '../modules/info/info.router';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/ai-config',
    route: AiConfigRoutes,
  },
  {
    path: '/info',
    route: InfoRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
