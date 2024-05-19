import { ErrorMessages, ProfileSettings, regExp } from '../constants';
import Joi from 'joi';

const passwordSettings = Joi.string().min(ProfileSettings.passMinLength).max(ProfileSettings.passMaxLength).required().messages({
  'any.required': ErrorMessages.passwordRequiredErr,
  'string.min': ErrorMessages.passMinLengthErr,
  'string.max': ErrorMessages.passMaxLengthErr,
});
const emailSettings = Joi.string().pattern(regExp.email).required().messages({
  'any.required': ErrorMessages.emailRequiredErr,
  'string.pattern.base': ErrorMessages.emailRegExErr,
});

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': ErrorMessages.nameRequiredErr }),
  lastName: Joi.string(),
  password: passwordSettings,
  email: emailSettings,
  phone: Joi.string().pattern(regExp.phone).messages({
    'string.pattern.base': ErrorMessages.phoneRegExErr,
  }),
  location: Joi.string(),
  dateOfBirth: Joi.string().isoDate(),
});

const signInSchema = Joi.object({
  password: passwordSettings,
  email: emailSettings,
});

export default { signUpSchema, signInSchema };
