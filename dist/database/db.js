"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const DB_URI = process.env.DB_URI;
const NODE_ENV = process.env.NODE_ENV;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'; // Default to 1 day if not set
const PORT = process.env.PORT || 3000;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNAME || "postgres",
    password: DB_PASSWORD || "postgres",
    database: DB_NAME || "express_ts",
    synchronize: NODE_ENV !== "production", // Auto-create tables in dev
    logging: NODE_ENV !== "production",
    entities: [User_1.User],
    migrations: ["src/migrations/*.ts"],
});
