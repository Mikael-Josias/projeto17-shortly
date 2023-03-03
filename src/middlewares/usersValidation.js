import { usersSignInSchema, usersSignUpSchema } from "../schemas/usersSchema.js";

export function verifySignUpUserData(req, res, next) {
    const data = req.body;
    
    const { error, value } = usersSignUpSchema.validate(data, { abortEarly: false });
    
    value.password !== value.confirmPassword && res.sendStatus(422);
    error? res.sendStatus(422) : next();
}

export function verifySignInUserData(req, res, next) {
    const data = req.body;

    const { error } = usersSignInSchema.validate(data, { abortEarly: false });
    error? res.sendStatus(422) : next();
}