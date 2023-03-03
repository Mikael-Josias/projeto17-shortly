import Joi from "joi";

export const validateShortenUrl = Joi.object({
    url: Joi.string().required(),
});