import { Repository } from 'typeorm';
import logger from '../../logger';
import library from '../db/entity/kiko';
import { User } from '../db/entity/kiko/User.entity';
import Auth from '../utils/Auth';
import CommonError from '../constant/ErrorMessages';
import SuccessMessages from '../constant/SuccessMessages';
import httpConstants from '../constant/httpConstants';

class AdminService {
  constructor() {}
  /**
   * Service for admin login
   * @param reqBody
   * @returns
   */
  async adminLogin(reqBody) {
    logger.info(
      `Service : adminLogin, Request-Body : ${JSON.stringify(reqBody)}`
    );
    // Checking login credentials
    const userRepository: Repository<User> = library.getRepository(User);

    // Get user data
    const userData = await userRepository.findOne({
      where: {
        email: reqBody.email,
      },
    });

    if (!userData) {
      return {
        statusCode: httpConstants.HTTP_FORBIDDEN,
        body: {
          status: false,
          error: CommonError.INVALID_EMAIL,
        },
      };
    }
    // Check password
    const checkPassword = Auth.validatePassword(
      reqBody.password,
      userData.password
    );

    if (!checkPassword) {
      return {
        statusCode: httpConstants.HTTP_FORBIDDEN,
        body: {
          status: false,
          error: CommonError.INVALID_PASSWORD,
        },
      };
    }

    const jwt = Auth.generateJWTToken(userData.id, userData.userToken);

    return {
      statusCode: httpConstants.HTTP_SUCCESS_OK,
      body: {
        status: true,
        message: SuccessMessages.LOGIN,
        data: {
          id: userData.id,
          email: userData.email,
          token: jwt,
        },
      },
    };
  }
}

const adminService: AdminService = new AdminService();
export default adminService;
