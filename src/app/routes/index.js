import express from 'express';
import { NoticeRoutes } from '../modules/notice/notice.route.js';
import { UserRoutes } from '../modules/auth/auth.route.js';
import { PropertyRoutes } from '../modules/properties/property.route.js';
import { TeamMemberRoutes } from '../modules/team/team.route.js';
import { ProjectRoutes } from '../modules/project/project.route.js';
import { CostRoutes } from '../modules/cost/cost.route.js';
import { BudgetRoutes } from '../modules/budget/budget.route.js';
import { BannerRoutes } from '../modules/banner/banner.route.js';
import { WorkRoutes } from '../modules/work/work.route.js';
import { ServiceRoutes } from '../modules/services/services.route.js';
import { AgentRoutes } from '../modules/agent/agent.route.js';
import { PaymentRoutes } from '../modules/agent/payment.route.js';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRoutes,
  },
  {
    path: '/agent',
    routes: AgentRoutes,
  },
  {
    path: '/agent',
    routes: PaymentRoutes,
  },
  {
    path: '/property',
    routes: PropertyRoutes,
  },
  {
    path: '/team',
    routes: TeamMemberRoutes,
  },
  {
    path: '/project',
    routes: ProjectRoutes,
  },
  {
    path: '/budget',
    routes: BudgetRoutes,
  },
  {
    path: '/cost',
    routes: CostRoutes,
  },
  {
    path: '/notice',
    routes: NoticeRoutes,
  },
  {
    path: '/banner',
    routes: BannerRoutes,
  },
  {
    path: '/work',
    routes: WorkRoutes,
  },
  {
    path: '/service',
    routes: ServiceRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.routes));
export default routes;
