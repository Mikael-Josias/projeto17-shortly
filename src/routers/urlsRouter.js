import { Router } from "express";
import { postNewUrl } from "../controllers/urlsController.js";
import { validateShortenUrls } from "../middlewares/urlsValidation.js";
import { validateUserToken } from "../middlewares/validateUserToken.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateUserToken, validateShortenUrls, postNewUrl);
urlsRouter.post("/urls/:id", );

export default urlsRouter;