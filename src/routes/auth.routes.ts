import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller";
import { UserService } from "../services/UserService";

const authRouter = Router();
const authController = new AuthController( new UserService());

authRouter.post("/register", async (req, res, next) => {
		await authController.register(req, res, next);
});

authRouter.get("/login", async (req, res, next) => {
        await authController.login(req, res, next);
});
authRouter.get("/logout", async (req, res, next) => {
        await authController.logout(req, res, next);
});

authRouter.get("/refresh", async (req, res, next) => {
        await authController.refresh(req, res, next);
});

export default authRouter;