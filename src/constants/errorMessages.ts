import ProfileSettings from './profileSettings';

const enum ErrorMessages {
  nameRequiredErr = 'Missing required name field',
  phoneRequiredErr = 'Missing required phone field',
  passwordRequiredErr = 'Missing required password field',
  passMinLengthErr = `Password length must be at least ${ProfileSettings.passMinLength} characters long`,
  passMaxLengthErr = `Password length must be no more than ${ProfileSettings.passMaxLength} characters long`,
  emailRequiredErr = 'Missing required email field',
  emailRegExErr = 'Email must be letters, digits, dot and @',
  phoneRegExErr = 'Phone number must be digits and can start with character +',
  fileAbsentErr = 'File is absent',
  missingTargetFieldErr = 'An unexpected property was found in the object',
  missingFieldsErr = 'Missing fields',
}

export default ErrorMessages;
