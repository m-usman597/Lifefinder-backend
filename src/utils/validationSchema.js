const Joi = require("joi");

const hospitalSchema = Joi.object({
  title: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  services: Joi.array()
    .items(
      Joi.object({
        serviceName: Joi.string().optional(),
        servicePrice: Joi.string().optional(),
        availability: Joi.object()
          .pattern(
            Joi.string(), // Keys are days of the week
            Joi.array().items(Joi.string().pattern(/^\d{2}:\d{2}$/)) // Values are arrays of times in HH:MM format
          )
          .optional(),
      })
    )
    .optional(),
  countryCode: Joi.string().required(),
  address: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  image: Joi.string().uri().optional(),
});

module.exports = {
  hospitalSchema,
};
