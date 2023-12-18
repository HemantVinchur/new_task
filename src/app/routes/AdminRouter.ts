import { RouterManager } from '../core/RouterManager';
import adminController from '../controller/AdminController';
import jwtMiddleware from '../core/middleware/JwtMiddleware';

const adminRouterManager: RouterManager = new RouterManager('/admin');

/**
 * Admin - login
 */
adminRouterManager.post('/login', adminController.adminLogin);

/**
 * Admin - dashboard
 */
// adminRouterManager.get(
//   '/dashboard',
//   jwtMiddleware.jwtMiddleWare(),
//   jwtMiddleware.hasAdminRole(),
//   adminController.adminDashboard
// );

export default adminRouterManager;
