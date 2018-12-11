const Joi = require('joi');

// Extend Joi validator by adding objectId type
Joi.objectId = require('joi-objectid')(Joi);
