"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserService_1 = require("../services/UserService");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const userRouter = (0, express_1.Router)();
const userController = new UserController_1.UserController(new UserService_1.UserService());
userRouter.post("/users", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.createUser(req, res, next);
}));
userRouter.get("/users/:email", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.getUserByEmail(req, res, next);
}));
userRouter.get("/users", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.getAllUsers(req, res, next);
}));
userRouter.delete("/users/:id", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.deleteUser(req, res, next);
}));
