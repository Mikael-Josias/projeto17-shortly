import Joi from "joi";

export const usersSchema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});