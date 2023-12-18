import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../resources/config';
import CryptoJS = require('crypto');
import { Context } from 'koa';
import jwtMiddleware from '../core/middleware/ErrorMiddleware';
const RequestIp = require('@supercharge/request-ip');
export default class Auth {
  /**
   * has password string
   * @param  {string} password [description]
   * @return {string}          [description]
   */
  public static hashPassword(password: string): string {
    const rounds = 12;
    return bcrypt.hashSync(password, rounds);
  }

  /**
   * match hash password with unhased password
   * @param  {string}  password
   * @param  {string}  hashPassword
   * @return {boolean}
   */
  public static validatePassword(
    password: string,
    hashPassword: string
  ): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * generate jwt token with user id, user token and user role
   * @param  {number} userId
   * @param  {string} tokenId
   * @return {string}
   */
  public static generateJWTToken(userId: number, tokenId: string): string {
    return jwt.sign(
      {
        id: userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // 1 hour * 12 12hour
        tokenId: tokenId,
      },
      config.token
    );
  }
  /**
   * generate user token for jwt
   * @return {string}
   */
  public static generateUserToken(): string {
    return CryptoJS.randomBytes(20)
      .toString('base64')
      .replace(/\//g, '')
      .replace(/\+/g, '')
      .replace(/=/g, '');
    // return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)
  }
}
