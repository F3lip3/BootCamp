import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.udpate);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.udpate);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
