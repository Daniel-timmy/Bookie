import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User.model";

export interface AuthRequest extends Request {
    user?: User;
}