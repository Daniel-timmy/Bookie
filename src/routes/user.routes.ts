import { Router } from "express";
import { UserController } from "../controllers/user/user.controller";
import { UserService } from "../services/UserService";
import {authentication} from "../middlewares/auth.middleware";

const userRouter = Router();
const userController = new UserController( new UserService());

userRouter.post("/", authentication, async (req, res, next) => {
		await userController.createUser(req, res, next);
});

userRouter.get("/:id", authentication, async(req, res, next)=>{
        await userController.getUserById(req, res, next)
})

userRouter.get("/", authentication, async (req, res, next) => {
        await userController.getAllUsers(req, res, next);
});

userRouter.delete("/:id", authentication, async (req, res, next) => {
        await userController.deleteUser(req, res, next);
});

export default userRouter;