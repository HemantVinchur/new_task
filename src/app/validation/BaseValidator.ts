import kiko from '../db/entity/kiko';
import { User } from '../db/entity/kiko/User.entity';

const niv = require('node-input-validator');
// example
niv.extend('uniqueUserEmail', async ({ value, args }) => {
  // default field is email in this example
  const filed = args[1] || 'email';
  let condition = {};
  condition[filed] = value.toLowerCase();
  let result = await kiko.getRepository(User).findOne({ where: condition });
  // email already exists
  if (result) {
    return false;
  }
  return true;
});

niv.extend('arrayMinMaxLength', async ({ value, args }) => {
  // default field is email in this example
  console.log(value, args, typeof value, '---------------------');
  const input = value;
  const minLength = args[0] ? args[0] : 1;
  const maxLength = args[1] ? args[1] : 5;
  if (typeof input != typeof []) {
    return false;
  }
  if (input && input.length > minLength && input.length > maxLength) {
    console.log();
    return false;
  }
  return true;
});

niv.extendMessages(
  {
    password: 'password contains min 8 char, 1 number and 1 symbol',
    uniqueUserEmail:
      'This email address is already associated with an account. Please sign in or use another email address.',
    arrayMinMaxLength: 'You can not select more than 5 values',
    uniqueCompanyProfileUser: 'User already added for your profile',
    userExists: 'The :attribute does not exists',
    verifyUserToken: 'The :attribute does not exists',
    verifySecondaryEmailToken: ':attribute does not exist',
    userCardExists: 'The :attribute does not exists',
    emailExists: 'The :attribute does not exist',
    forgotPasswordTokenExists:
      'The :attribute is either incorrect or is expired',
    matchUserId:
      'The :attribute does not have permission to access the resource.',
    verifyUserAccount: 'You do not have permission to access the resource.',
    roleExists: 'The :attribute does not exist',
    isUserLess:
      'Since there are users attached to the role. You cannot delete it.',
    adminUserAlreadyExists: 'User with this :attribute already exists.',
    adminUserExists: 'The user :attribute does not exist.',
  },
  'en'
);
niv.addCustomMessages({
  'personalMessage.maxLength':
    'The personal message cannot be greater than 255 characters.',
});
const baseValidator = niv;
export default baseValidator;
