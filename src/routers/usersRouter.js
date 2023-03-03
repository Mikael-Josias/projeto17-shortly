import { Router } from "express";

import { postSignUpUser } from "../controllers/usersController.js";
import { verifySignUpUserData } from "../middlewares/usersValidation.js";

const usersRouter = Router();

usersRouter.post("/signup", verifySignUpUserData, postSignUpUser);

export default usersRouter;