import { Router } from "express";
import { deleteShortUrl, getUrlById, postNewUrl } from "../controllers/urlsController.js";
import { validateShortenUrls } from "../middlewares/urlsValidation.js";
import { validateUserToken } from "../middlewares/validateUserToken.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateUserToken, validateShortenUrls, postNewUrl);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.delete("/urls/:id", validateUserToken, deleteShortUrl);

export default urlsRouter;