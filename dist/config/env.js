"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.NODE_ENV = exports.DB_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// Loads environment variables from process.env
exports.DB_URI = process.env.DB_URI;
exports.NODE_ENV = process.env.NODE_ENV;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_NAME = process.env.DB_NAME;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'; // Default to 1 day if not set
exports.PORT = process.env.PORT || 3000; // Default to 3000 if not set
