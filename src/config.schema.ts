import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(8080).required(),
  ENCRYPTION_KEY: Joi.string().required(),
});
