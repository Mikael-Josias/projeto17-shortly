import { Router } from "express";

import { postSignInUser, postSignUpUser } from "../controllers/usersController.js";
import { verifySignInUserData, verifySignUpUserData } from "../middlewares/usersValidation.js";

const usersRouter = Router();

usersRouter.post("/signup", verifySignUpUserData, postSignUpUser);
usersRouter.post("/signin", verifySignInUserData, postSignInUser);

export default usersRouter;