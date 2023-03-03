import Joi from "joi";

export const usersSignUpSchema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});

export const usersSignInSchema = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().required(),
});