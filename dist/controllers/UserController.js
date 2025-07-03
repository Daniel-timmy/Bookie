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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const newUser = yield this.userService.createUser(userData);
                return res.status(201).json(newUser);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findUserByEmail(id);
                if (!user) {
                    return null;
                }
                return user;
            }
            catch (error) {
                console.error(`Error fetching user with ID ${id}:`, error); // Log for debugging
                return null;
            }
        });
    }
    getUserByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const user = yield this.userService.findUserByEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                return res.status(200).json(users);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userService.findUserByEmail(id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                yield this.userService.deleteUser(id);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.UserController = UserController;
