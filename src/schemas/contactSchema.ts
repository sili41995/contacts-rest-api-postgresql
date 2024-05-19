import { ErrorMessages, regExp } from '../constants';
import Joi from 'joi';

const addSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': ErrorMessages.nameRequiredErr }),
  phone: Joi.string().pattern(regExp.phone).required().messages({
    'any.required': ErrorMessages.phoneRequiredErr,
    'string.pattern.base': ErrorMessages.phoneRegExErr,
  }),
  email: Joi.string().pattern(regExp.email).messages({
    'string.pattern.base': ErrorMessages.emailRegExErr,
  }),
  role: Joi.string(),
  description: Joi.string(),
  tgUsername: Joi.string(),
  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object()
  .keys({
    favorite: Joi.boolean(),
  })
  .messages({
    'object.unknown': ErrorMessages.missingTargetFieldErr,
  });

export default { addSchema, updateStatusContactSchema };
