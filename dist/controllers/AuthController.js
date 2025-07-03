"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthController = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../config/env");
const HttpError_js_1 = require("../error/HttpError.js");
class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const { name, email, password } = req.body;
                if (!userData.name || !userData.email || !userData.password) {
                    throw new HttpError_js_1.HttpError("Missing required parameter", 400);
                }
                const existingUser = yield this.userService.findUserByEmail(userData.email);
                if (existingUser) {
                    throw new HttpError_js_1.HttpError("User with email already exists", 409);
                }
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const userDataWithHashedPassword = Object.assign(Object.assign({}, userData), { password: hashedPassword });
                const newUser = yield this.userService.createUser(userDataWithHashedPassword);
                const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'; // Default to 1 day if not set
                if (!env_1.JWT_SECRET) {
                    throw new HttpError_js_1.HttpError("JWT_SECRET is not defined", 500);
                }
                const access = jwt.sign({ userId: newUser.id, email: newUser.email }, env_1.JWT_SECRET, { expiresIn: '1d' });
                // Generate refresh token
                const refresh = jwt.sign({ userId: newUser.id, email: newUser.email }, env_1.JWT_SECRET, { expiresIn: '7d' } // Refresh token valid for 7 days
                );
                return res.status(201).json({
                    success: true,
                    message: 'User created successfully',
                    data: {
                        access,
                        refresh,
                        user: newUser,
                    }
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refresh } = req.body;
                if (!refresh) {
                    return res.status(400).json({
                        success: false,
                        message: 'Refresh token is required',
                        data: null
                    });
                }
                if (!env_1.JWT_SECRET) {
                    throw new HttpError_js_1.HttpError("JWT_SECRET is not defined", 500);
                }
                let payload;
                try {
                    payload = jwt.verify(refresh, env_1.JWT_SECRET);
                }
                catch (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid or expired refresh token',
                        data: null
                    });
                }
                const user = yield this.userService.findUserById(payload.userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found',
                        data: null
                    });
                }
                const access = jwt.sign({ userId: user.id, email: user.email }, env_1.JWT_SECRET, { expiresIn: '1d' });
                const refreshToken = jwt.sign({ userId: user.id, email: user.email }, env_1.JWT_SECRET, { expiresIn: '7d' } // Refresh token valid for 7 days
                );
                return res.status(200).json({
                    success: true,
                    message: 'Access token refreshed successfully',
                    data: {
                        access,
                        refresh: refreshToken,
                        user
                    }
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.findUserByEmail(email);
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: 'User with email not found',
                        data: null,
                        details: {
                            "field": "email",
                            "error": "Invalid Email Address"
                        },
                    });
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid password',
                        data: null,
                        details: {
                            "field": "password",
                            "error": "Your password is incorrect"
                        },
                    });
                }
                const access = jwt.sign({ userId: user.id, email: user.email }, env_1.JWT_SECRET, { expiresIn: '1d' } // JWT_EXPIRES_IN
                );
                const refresh = jwt.sign({ userId: user.id, email: user.email }, env_1.JWT_SECRET, { expiresIn: '7d' } // Refresh token valid for 7 days
                );
                res.status(200).json({
                    success: true,
                    message: 'User signed in successfully',
                    data: {
                        access,
                        refresh,
                        user,
                    }
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthController = AuthController;
