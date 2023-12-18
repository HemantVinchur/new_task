import { Repository } from "typeorm";
import { decode } from "jsonwebtoken";
import { Context, Next } from "koa";
import CommonError from "../../constant/ErrorMessages";
import httpConstants from "../../constant/httpConstants";
import RoleConstant from "../../constant/RoleConstant";
import { User } from "../../db/entity/kiko/User.entity";
import library from "../../db/entity/kiko";

class JwtMiddleware {
  public getToken(ctx: Context) {
    const header = ctx.request.headers.authorization;
    if (!header) {
      return null;
    }
    const parts = header.split(" ");
    if (parts.length !== 2) {
      return null;
    }
    const scheme = parts[0];
    const token = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      return token;
    }
    return null;
  }

  jwtMiddleWare() {
    let getToken = this.getToken;

    return async (ctx: Context, next) => {
      const token = getToken(ctx);
      if (!token) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
        return;
      }
      let decoded = null;
      try {
        decoded = decode(token);
        ctx.state.user = decoded;

        // The client's session has expired and must log in again.
        if (decoded?.exp < Math.floor(Date.now() / 1000)) {
          ctx.status = httpConstants.HTTP_UNAUTHORIZED;
          ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
          return;
        }
        // return next()
        // here will be the project specific code to check information inside the token
        // Checking for invoice details
        const invoiceRepository: Repository<User> = library.getRepository(User);
        const findUser = await invoiceRepository.findOne({
          where: {
            id: ctx.state.user.id
          }
        })
        if (!findUser) {
          throw new Error();
        }
        let sqlQuery =
          "SELECT * FROM `Users` where user_id = :userId and d2t_token = :tokenId and deletedAt IS null";

        ctx.state.user = decoded;
        if (!ctx.state.user) {
          throw new Error();
        }
        return next();
      } catch (err) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
      }
    };
  }

  hasAdminRole() {
    let getToken = this.getToken;

    return async (ctx: Context, next) => {
      const token = getToken(ctx);
      if (!token) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
        return;
      }
      let decoded = null;
      try {
        decoded = decode(token);
        if (decoded.role === RoleConstant.ADMIN) {
          return next();
        } else {
          ctx.status = httpConstants.HTTP_UNAUTHORIZED;
          ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401, message: CommonError.NOT_AUTHORIZED_TO_ACCESS_EVENT } };
          return;
        }
      } catch (err) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
      }
    };
  }

  hasCompanyRole() {
    let getToken = this.getToken;

    return async (ctx: Context, next) => {
      const token = getToken(ctx);
      if (!token) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
        return;
      }
      let decoded = null;
      try {
        decoded = decode(token);
        if (decoded.role === RoleConstant.COMPANY_ADMIN || decoded.role === RoleConstant.COMPANY_LEAD) {
          return next();
        } else {
          ctx.status = httpConstants.HTTP_UNAUTHORIZED;
          ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401, message: CommonError.NOT_AUTHORIZED_TO_ACCESS_EVENT } };
          return;
        }
      } catch (err) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
      }
    };
  }

  hasContractorRole() {
    let getToken = this.getToken;

    return async (ctx: Context, next) => {
      const token = getToken(ctx);
      if (!token) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
        return;
      }
      let decoded = null;
      try {
        decoded = decode(token);
        if (decoded.role === RoleConstant.CONTRACTOR) {
          return next();
        } else {
          ctx.status = httpConstants.HTTP_UNAUTHORIZED;
          ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401, message: CommonError.NOT_AUTHORIZED_TO_ACCESS_EVENT } };
          return;
        }
      } catch (err) {
        ctx.status = httpConstants.HTTP_UNAUTHORIZED;
        ctx.body = { error: { code: "GEN-UNAUTHORIZED", http_code: 401 } };
      }
    };
  }
}

const jwtMiddleware: JwtMiddleware = new JwtMiddleware();
export default jwtMiddleware;
