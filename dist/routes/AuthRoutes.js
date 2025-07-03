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
const AuthController_1 = require("../controllers/AuthController");
const UserService_1 = require("../services/UserService");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const authRouter = (0, express_1.Router)();
const authController = new AuthController_1.AuthController(new UserService_1.UserService());
authRouter.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authController.createUser(req, res, next);
}));
authRouter.get("/login", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authController.login(req, res, next);
}));
authRouter.get("/logout", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authController.logout(req, res, next);
}));
authRouter.get("/refresh", auth_middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield authController.refresh(req, res, next);
}));
