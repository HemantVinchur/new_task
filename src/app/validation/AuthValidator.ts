import { Context } from 'koa';
import comValidator from './BaseValidator';
import genValidator from './GeneralValidator';

export class AuthValidator {
  /**
   * validate login
   * @param  {Context} ctx
   */
  async login(ctx: Context) {
    const valid = new comValidator.Validator(ctx.request.body, {
      email: 'required|email',
      password: 'required|minLength:8',
    });
    const v = await valid.check();
    if (!v) {
      return genValidator.error(valid.errors);
    }
    return genValidator.success();
  }
}

const authValidator: AuthValidator = new AuthValidator();
export default authValidator;
