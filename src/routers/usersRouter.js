import { Router } from "express";

import { getUserInfo, postSignInUser, postSignUpUser } from "../controllers/usersController.js";
import { verifySignInUserData, verifySignUpUserData } from "../middlewares/usersValidation.js";
import { validateUserToken } from "../middlewares/validateUserToken.js";

const usersRouter = Router();

usersRouter.post("/signup", verifySignUpUserData, postSignUpUser);
usersRouter.post("/signin", verifySignInUserData, postSignInUser);
usersRouter.get("/users/me", validateUserToken, getUserInfo);

export default usersRouter;