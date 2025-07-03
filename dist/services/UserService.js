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
exports.UserService = void 0;
const db_1 = require("../database/db");
const User_1 = require("../models/User");
class UserService {
    constructor() {
        this.userRepository = db_1.AppDataSource.getRepository(User_1.User);
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepository.create(data);
            return yield this.userRepository.save(user);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneBy({ email });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneBy({ id });
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.update(id, data);
            return yield this.userRepository.findOneBy({ id });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.delete(id);
        });
    }
}
exports.UserService = UserService;
