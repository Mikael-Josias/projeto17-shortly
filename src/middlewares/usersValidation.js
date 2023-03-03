import { usersSchema } from "../schemas/usersSchema.js";

export function verifySignUpUserData(req, res, next) {
    const data = req.body;
    
    const { error, value } = usersSchema.validate(data, { abortEarly: false });
    
    value.password !== value.confirmPassword && res.sendStatus(422);
    error? res.sendStatus(422) : next();
}