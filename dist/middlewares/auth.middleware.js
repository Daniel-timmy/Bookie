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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const UserController_js_1 = require("../controllers/UserController.js");
const UserService_js_1 = require("../services/UserService.js");
const jsonwebtoken_2 = require("jsonwebtoken");
const userController = new UserController_js_1.UserController(new UserService_js_1.UserService());
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
        const user = yield userController.getUserById(decoded.userId);
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_2.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
        }
        else if (error instanceof jsonwebtoken_2.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
        }
        else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        return;
    }
});
exports.default = authorize;
