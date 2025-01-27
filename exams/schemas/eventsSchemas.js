const Joi = require("joi");

const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  location: Joi.string().required(),
});

module.exports = {
  eventSchema,
};