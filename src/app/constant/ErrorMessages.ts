class CommonError {
  constructor() {}
  static SOMETHING_WENT_WRONG = 'Something went wrong';
  static INVALID_TOKEN = 'Invalid token';
  // EMAIL
  static INVALID_EMAIL = 'This email is not registered with us. Please signup';
  static EMAIL_ALREADY_EXIST =
    'This email address is already associated with an account. Please sign in or use another email address.';
  static EMAIL_NOT_VERIFIED = 'Please verify your email';
  static EMAIL_ALREADY_VERIFIED = 'Your email is already verified';

  // PASSWORD
  static INVALID_PASSWORD = 'Your email and password does not match';
  static CURRENT_PASSWORD_MISMATCH = 'Current password mismatch!';
  static PASSWORD_NOT_MATCH = 'Confirm Password should be same as password';
  static PREVIOUS_PASSWORD =
    'Please use a new password! The current and old password can not be same';

  // Resource not found
  static NOT_FOUND = 'The resource you are looking for does not exist';
}
export default CommonError;
