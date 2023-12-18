import logger from '../../logger';
import adminService from '../service/AdminService';
import apiErrorHandler from '../utils/ApiErrorHandler';
import AuthValidator from '../validation/AuthValidator';

class AdminController {
  constructor() {}

  /**
   * Admin login
   * @param {Context} ctx
   * @returns
   */
  async adminLogin(ctx) {
    try {
      const validation = await AuthValidator.login(ctx);
      if (!validation.isValid) {
        ctx.status = validation.status;
        ctx.body = validation.data;
        return;
      }
      logger.info(
        `Controller : login, Request-Body : ${JSON.stringify(ctx.request.body)}`
      );

      const response = await adminService.adminLogin(ctx.request.body);

      ctx.status = response.statusCode;
      ctx.body = response.body;
    } catch (error) {
      logger.error(`Controller : login, Error : ${JSON.stringify(error)}`);
      apiErrorHandler.errorHandler(error, ctx);
    }
  }
}

const adminController: AdminController = new AdminController();
export default adminController;
