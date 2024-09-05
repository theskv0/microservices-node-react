import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import SignupSchema from "../validators/user.signup";
import LoginSchema from "../validators/user.login";
import { AuthMiddleware, GlobalHandler, ValidationMiddleware } from "@project3/common";
import UpdateProfileSchema from "../validators/user.update";

const routes = Router();

routes.post("/signup", ValidationMiddleware(SignupSchema), GlobalHandler(AuthController.signup));
routes.post("/login", ValidationMiddleware(LoginSchema), GlobalHandler(AuthController.login));
routes.post("/logout", AuthMiddleware, GlobalHandler(AuthController.logout));
routes.get("/current-user", AuthMiddleware, GlobalHandler(AuthController.currentUser));
routes.put(
  "/update-profile",
  AuthMiddleware,
  ValidationMiddleware(UpdateProfileSchema),
  GlobalHandler(AuthController.updateProfile)
);

export default routes;
